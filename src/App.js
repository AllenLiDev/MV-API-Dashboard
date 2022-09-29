import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { CSVLink, CSVDownload } from "react-csv";
import fileDownload from 'js-file-download';

const App = () => {
  const [assets, setAssets] = useState([])
  const [assetCount, setAssetCount] = useState(0)
  const [filteredAssets, setFilteredAssets] = useState([])
  const [cognitiveImageMetadata, setCognitiveImageMetadata] = useState([])
  const [cognitiveVideoMetadata, setCognitiveVideoMetadata] = useState([])
  const [cognitiveVideoIds, setCognitiveVideoIds] = useState([])
  const [aviTokens, setAviTokens] = useState([])
  const [apiKey, setApiKey] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [cusattributes, setCusattributes] = useState([])
  const [username, setUsername] = useState("allenliadmin%40mediavalet.net")
  const [password, setPassword] = useState("8Z9M7bR!")
  const [clientId, setClientId] = useState("0cce9ca4-93a5-48a7-9e6a-29022fa16c51")
  const [apiUrl, setApiUrl] = useState("https://api-usva.mediavalet.net/")
  const [authUrl, setAuthUrl] = useState('https://identity-va.mediavalet.net/')
  const [users, setUsers] = useState([])
  const headers = {
    'content-type': 'application/json',
    'authorization': apiKey
  }

  // const body = "grant_type=password&username=funimationadmin%40mediavalet.net&password=D9NtB7#&client_id=619f1b23-20ed-4360-bc61-7ee485ae0eb5"
  // const body = "grant_type=password&username=crunchyrolladmin%40mediavalet.net&password=4cHjcw4HUpL772sK&client_id=95e8535d-59b5-4163-940a-7455f87d4a6f"
  // const body = "grant_type=password&username=texmedadmin@mediavalet.net&password=x29074Rt2bUE4CG61Kv&client_id=a778a755-b73f-4127-8a17-2ff805f424b5"
  // const body = "grant_type=password&username=ffwagencyadmin%40mediavalet.net&password=DikjP2ab99lPQdBiRo24&client_id=718d9f18-70b1-41cf-851f-0b0d32f152f5"
  // const body = "grant_type=password&username=mlseadmin%40mediavalet.net&password=GzJD9zDwwqPLR48&client_id=f72d94a8-82c6-4556-b418-abd299d72fb2"
  // const body = "grant_type=password&username=nbcu-theiaadmin%40mediavalet.net&password=USe18UI4Ois1cC34vnD&client_id=f4283af4-0cc1-4e2b-a8ee-4acadbc7f183"
  // const body = "grant_type=password&username=allenliadmin%40mediavalet.net&password=8Z9M7bR!&client_id=0cce9ca4-93a5-48a7-9e6a-29022fa16c51"
  // const body = "grant_type=password&username=urbanstudionycadmin%40mediavalet.net&password=5lt47B09a762I6fD09O&client_id=1ad3463c-36cf-41a0-b99d-2e8105733b97"
  // const body = "grant_type=password&username=leadershiprigoradmin%40mediavalet.net&password=jJEUQGp4X4vO45tLI8&client_id=0b700e5a-b2e8-4963-ade4-18951be730ac"

  // AUTHENTICATE
  const getApiKey = async () => {
    const url = `${authUrl}token`
    const headers = { 'content-type': 'application/json' }
    const body = `grant_type=password&username=${username}&password=${password}&client_id=${clientId}`
    const result = await axios.post(url, body, headers)
    setApiKey("bearer " + result.data.access_token)
  }

  // TOTAL ASSET COUNT
  const getAssetCount = async () => {
    const url = `${apiUrl}assets/search`
    const data = {
      "search": "",
      "count": 1,
      "offset": 0,
      "filters": "(FileExtension EQ 'XML')",
      //  AVI FIlter
      // "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // no expiry date assets
      // "filters": "(DateExpired GT 9999-12-31T00:00:00.000Z)",
      "sort": "record.createdAt D",
      // category filter current cat without nested
      // "containerfilter": "(CategoryIds/ANY(c: c EQ '5e2e47bf-b258-4a6e-a6f6-bbdb18ea3f8a'))"
      // category filter with nested
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'eb7ed8c7-8379-423d-bad8-c61061113c67') OR CategoryAncestorIds/ANY(c: c EQ 'eb7ed8c7-8379-423d-bad8-c61061113c67'))"
    }
    const result = await axios.post(url, data, { headers: headers })
    setAssetCount(result.data.payload.assetCount)
  }

  // ITERATE OFFSET
  const getAssets = async (offset, dateFilter) => {
    const url = `${apiUrl}assets/search`
    // const url = `${apiUrl}categories/aec0ba15-92bb-43d7-8095-ccf2662b1fec/assets?count=1000&offset=${offset}&sort=record.createdAt+D`
    const data = {
      "search": "",
      "count": 1000,
      "offset": offset, 
      "filters": (dateFilter === undefined) ? "((FileExtension EQ 'XML'))" : "(" + dateFilter + " AND (FileExtension EQ 'XML'))",
      //  AVI FIlter
      // "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // filter filetype
      // filters: "((FileExtension EQ 'XML'))",
      "sort": "record.createdAt D",
      // "containerfilter": "(CategoryIds/ANY(c: c EQ '5e2e47bf-b258-4a6e-a6f6-bbdb18ea3f8a'))"
      // category filter with nested
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'eb7ed8c7-8379-423d-bad8-c61061113c67') OR CategoryAncestorIds/ANY(c: c EQ 'eb7ed8c7-8379-423d-bad8-c61061113c67'))"

    }
    await axios.post(url, data, { headers: headers })
      .then((res) => {
        setAssets(assets => [...assets, ...res.data.payload.assets])
        // if offset greater thyepan 100k (azure limit)
        if (offset < assetCount) {
          if (offset >= 100000) {
            dateFilter = ("DateUploaded LE " + res.data.payload.assets[999].createdAt)
            getAssets(0, dateFilter)
          } else {
            offset += 1000
            getAssets(offset, dateFilter)
          }
        }
      })
  }

  // get custom attributes mapping
  const getCustomAttributes = () => {
    let tempAttributes = new Map();
    const url = `${apiUrl}attributes`
    axios.get(url, { headers: headers })
      .then(res => {
        for (let attribute of res.data.payload) {
          tempAttributes.set(attribute.id, attribute.name)
        }
        setCusattributes(tempAttributes)
      })
  }

  // get category path from category ID
  const getCategoryPath = () => {
    const url = `${apiUrl}categories/c8fc93e1-b901-461b-8a2a-7c2f869a80e0`
    axios.get(url, { headers: headers })
      .then(res => {
        console.log(res.data.payload.tree.path)
      })
  }

  // gets users 
  const getUsers = () => {
    const url = `${apiUrl}users`
    axios.get(url, { headers: headers })
      .then(res => {
        setUsers(res.data.payload.users)
      })
  }

  // get cognative metadata IMAGE
  const getCognitiveImageMetadata = async () => {
    let promises = []
    let data = []
    let count = 0
    for (let asset of assets) {
      if (count >= 9000 && count < 9999) {
        if (asset.media.type === 'Image') {
          let tags = []
          let confidences = []
          let url = `${apiUrl}assets/${asset.id}/autotags`
          promises.push(
            axios.get(url, { headers: headers })
              .then(res => {
                for (let tag in res.data.payload.tags) {
                  tags.push(res.data.payload.tags[tag].name)
                  confidences.push(res.data.payload.tags[tag].confidence)
                }
                let tempMetadata = {
                  AssetId: asset.id,
                  Tags: tags,
                  Confidence: confidences
                }
                data.push(tempMetadata)
              })
          )
        }
      }
      count++
    }
    Promise.all(promises).then(() => setCognitiveImageMetadata(data))
  }

  // get cognative metadata Status
  const getCognitiveVideoStatus = async (offset) => {
    let curAsset = assets[offset]
    if (curAsset.media.type === 'Video') {
      let url = `${apiUrl}assets/${curAsset.id}/videoIntelligence/status`
      // URL 1 for status
      await axios.get(url, { headers: headers })
        .then(res => {
          if (res.data.payload.Status === "Completed") {
            let data = {
              AssetId: curAsset.id,
              AssetName: curAsset.file.fileName
            }
            setCognitiveVideoIds(cognitiveVideoIds => [...cognitiveVideoIds, data])
          }
        })
        .catch(err => {
          console.log(err, offset)
        })
    }
    if (offset < assetCount) {
      getCognitiveVideoStatus((++offset))
    }
  }


  // get cognative metadata Insight
  const getCognitiveVideoMetadata = async (offset) => {
    let curAsset = assets[offset]
    let url2 = `${apiUrl}assets/${curAsset.id}/videoIntelligence/insights`
    // URL 2 insights (keywords) call
    await axios.get(url2, { headers: headers })
      .then(res => {
        let data = {
          AssetId: curAsset.id,
          AssetName: curAsset.file.fileName,
          keywords: res.data.payload.insights.keywords,
          faces: res.data.payload.insights.faces,
          labels: res.data.payload.insights.labels,
          topics: res.data.payload.insights.topics
        }
        setCognitiveVideoMetadata(cognitiveVideoMetadata => [...cognitiveVideoMetadata, data])
      })
      .catch(err => {
        console.log('no avi')
      })
    if (offset < assets.length) {
      getCognitiveVideoMetadata((++offset))
    }
  }

  const getCognitiveToken = async (offset) => {
    // url 3 for token
    let curAsset = assets[offset]
    let url3 = `${apiUrl}assets/${curAsset.id}/videoIntelligence/token`
    await axios.get(url3, { headers: headers })
      .then(res => {
        let tempToken = {
          filename: curAsset.file.fileName,
          accessToken: res.data.payload.accessToken,
          location: res.data.payload.location,
          videoIndexerAccountId: res.data.payload.videoIndexerAccountId,
          videoIndexerId: res.data.payload.videoIndexerId
        }
        setAviTokens(aviTokens => [...aviTokens, tempToken])
      })
      .catch(err => {
        console.log('no avi')
      })
    if (offset < assets.length) {
      getCognitiveToken((++offset))
    }
  }


  const getAviTranscript = async (offset) => {
    let { filename, accessToken, location, videoIndexerAccountId, videoIndexerId } = aviTokens[offset]
    let url = `https://api.videoindexer.ai/${location}/accounts/${videoIndexerAccountId}/videos/${videoIndexerId}/captions/?format=srt&includeAudioEffects=false&includeSpeakers=false&language=en-US`
    let aviHeaders = {
      'content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    }
    await axios.get(url, { headers: aviHeaders })
      .then(res => {
        if (res.data !== "") {
          fileDownload(res.data, `${filename}.srt`)
        }
      })
      .catch(err => {
        console.log(err)
      })
    if (offset < aviTokens.length) {
      getAviTranscript((++offset))
    }
  }

  const filterCognitiveVideoMetadata = () => {
    let videoMeta = cognitiveVideoMetadata
    let filteredMeta = []
    for (let asset of videoMeta) {
      let keywords = []
      let labels = []
      let topics = []
      let faces = []
      for (let keyword of asset.keywords) {
        keywords.push(keyword.text)
      }
      for (let label of asset.labels) {
        labels.push(label.text)
      }
      for (let topic of asset.topics) {
        topics.push(topic.text)
      }
      for (let face of asset.faces) {
        faces.push(face.text)
      }

      let filtered = {
        AssetId: asset.AssetId,
        Filename: asset.AssetName,
        Keywords: keywords,
        Labels: labels,
        Topics: topics,
        Faces: faces
      }
      filteredMeta.push(filtered)
    }
    setCognitiveVideoMetadata(filteredMeta)
  }


  // filter data for export to csv
  const filterAssets = () => {
    let allAssets = assets
    let tempFilteredAssets = []
    for (let asset of allAssets) {
      let keywords = []
      let categories = []
      let views = 0
      for (let user in asset.userViewCounts) {
        views += asset.userViewCounts[user]
      }
      for (let keyword in asset.keywords) {
        keywords.push(asset.keywords[keyword])
      }
      for (let category in asset.categories) {
        categories.push(asset.categories[category])
      }
      let filtered = {
        AssetId: asset.id,
        Title: asset.file.title,
        MD5Hash: asset.file.md5,
        Categories: categories,
        Description: asset.file.description,
        Keywords: keywords,
        AltText: asset.altText,
        UploadDate: new Date(asset.file.uploadedAt),
        UploadedBy: asset.record.createdBy.username,
        ExpiryDate: new Date(asset.file.expiresAt),
        Versions: asset.record.version.version,
        TotalViews: views
      }
      // custom attributes with mapping
      for (let attribute in asset.attributes) {
        filtered[cusattributes.get(attribute)] = (asset.attributes[attribute]).replace(/,/g, ';')
      }
      tempFilteredAssets.push(filtered)
    }
    setFilteredAssets(tempFilteredAssets)
  }

  useEffect(() => {
  }, [])


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleClientIdChange = (e) => {
    setClientId(e.target.value)
  }
  const handleDatacenterChange = (e) => {
    switch (e.target.value) {
      case 'usca':
        setApiUrl('https://api-usca.mediavalet.net/')
        setAuthUrl('https://identity-ca.mediavalet.net/')
        break;
      case 'usva':
        setApiUrl('https://api-usva.mediavalet.net/')
        setAuthUrl('https://identity-va.mediavalet.net/')
        break;
      case 'usva2':
        setApiUrl('https://mv-api-usva2.mediavalet.net/')
        setAuthUrl('https://mv-identity-usva2.mediavalet.net/')
        break;
      case 'usil':
        setApiUrl('https://api-usil.mediavalet.net/')
        setAuthUrl('https://identity-il.mediavalet.net/')
        break;
      case 'cato':
        setApiUrl('https://api-cato.mediavalet.net/')
        setAuthUrl('https://identity-cato.mediavalet.net/')
        break;
      case 'whistler':
        setApiUrl('https://mv-api-whistler.mediavalet.net/')
        setAuthUrl('https://mv-identity-whistler.mediavalet.net/')
        break;
      case 'eunl':
        setApiUrl('https://api-eunl.mediavalet.net/')
        setAuthUrl('https://identity-eu.mediavalet.net/')
        break;
      case 'aunsw':
        setApiUrl('https://mv-api-aunsw.mediavalet.net/')
        setAuthUrl('https://mv-identity-aunsw.mediavalet.net/')
        break;
    }
  }

  // render assets as component
  // const AssetComponent = ({ assets }) => {
  //   <div>
  //     Asset Componenents
  //     {assets.map(asset => (
  //       <div key={asset.id}> asset.id </div>
  //     ))}
  //   </div>
  // }
  return (
    <div className="App">
      <form>
        <label>
          Username
          <input
            name="Username"
            type="text"
            onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password
          <input
            name="Password"
            type="password"
            onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Client Id
          <input
            name="Client id"
            type="text"
            onChange={handleClientIdChange} />
        </label>
        <br />
        <label>Data Center:</label>
        <select name="DC" id="Data Centers" onChange={handleDatacenterChange}>
          <optgroup label="USA">
            <option value="usca">USCA</option>
            <option value="usva">USVA</option>
            <option value="usva2">USVA2</option>
            <option value="usil">USIL</option>
          </optgroup>
          <optgroup label="Canada">
            <option value="cato">CATO</option>
            <option value="whistler">Whistler</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="eunl">EUNL</option>
          </optgroup>
          <optgroup label="Australia">
            <option value="aunsw">AUNSW</option>
          </optgroup>
        </select>
      </form>
      <br />
      <div>
        <button onClick={getApiKey}>Authenticate</button>
        API KEY Set? {apiKey ? "Yes" : "No"}
      </div>
      <br />
      <div>
        <button onClick={getAssetCount}>Get Total Number of Assets</button>
        Total number of assets: {assetCount}
      </div>
      <div>
        <button onClick={() => getAssets(0)}>Get All Assets</button>
        {/* Asset Componenents
        {assets.map(asset => (
          <div key={asset.id}> {asset.id} </div>
        ))} */}
        Number of Assets Retrieved: {assets.length}
      </div>
      <div>
        <button onClick={getCustomAttributes}>Get Custom Attributes Mapping</button>
        Attribute Mapping Count: {cusattributes.size}
      </div>
      <div>
        <button onClick={filterAssets}>Filter Assets</button>
        {filteredAssets.length}
      </div>
      <div>
        <button onClick={getCategoryPath}>Get Category Paths</button>
      </div>
      <div>
        <CSVLink data={filteredAssets}>Export Metadata</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={getUsers}>Get Users</button>
        Users: {users.length}
      </div>
      <div>
        <CSVLink data={users}>Export Users</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={getCognitiveImageMetadata}>Get Image Cognitive Metadata</button>
        {cognitiveImageMetadata.length}
      </div>
      <div>
        <CSVLink data={cognitiveImageMetadata}>Export Image Cognitive Metadata</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={() => getCognitiveVideoStatus(0)}>Get Video Cognitive Status</button>
        {cognitiveVideoIds.length}
      </div>
      <div>
        <button onClick={() => getCognitiveVideoMetadata(0)}>Get Video Cognitive Metadata - Insight</button>
        {cognitiveVideoMetadata.length}
      </div>
      <div>
        <button onClick={() => getCognitiveToken(0)}>Get Video Cognitive Token</button>
        {aviTokens.length}
      </div>
      <div>
        <button onClick={() => getAviTranscript(0)}>Get Video Cognitive Transcript</button>
      </div>
      <div>
        <button onClick={filterCognitiveVideoMetadata}>Filter AVI VIDEO Assets</button>
      </div>
      <div>
        <CSVLink data={cognitiveVideoMetadata}>Export Video CognitiveMetadata</CSVLink>
      </div>
    </div>
  );
}

export default App;
