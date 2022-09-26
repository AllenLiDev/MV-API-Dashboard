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
  const headers = {
    'content-type': 'application/json',
    'authorization': apiKey
  }

  // AUTHENTICATE
  const getApiKey = async () => {
    const url = 'https://identity-va.mediavalet.net/token'
    const headers = { 'content-type': 'application/json' }
    // const body = "grant_type=password&username=ffwagencyadmin%40mediavalet.net&password=DikjP2ab99lPQdBiRo24&client_id=718d9f18-70b1-41cf-851f-0b0d32f152f5"
    // const body = "grant_type=password&username=funimationadmin%40mediavalet.net&password=D9NtB7#&client_id=619f1b23-20ed-4360-bc61-7ee485ae0eb5"
    // const body = "grant_type=password&username=nbcu-theiaadmin%40mediavalet.net&password=USe18UI4Ois1cC34vnD&client_id=f4283af4-0cc1-4e2b-a8ee-4acadbc7f183"
    // const body = "grant_type=password&username=allenliadmin%40mediavalet.net&password=8Z9M7bR!&client_id=0cce9ca4-93a5-48a7-9e6a-29022fa16c51"
    // const body = "grant_type=password&username=urbanstudionycadmin%40mediavalet.net&password=5lt47B09a762I6fD09O&client_id=1ad3463c-36cf-41a0-b99d-2e8105733b97"
    const body = "grant_type=password&username=leadershiprigoradmin%40mediavalet.net&password=jJEUQGp4X4vO45tLI8&client_id=0b700e5a-b2e8-4963-ade4-18951be730ac"
    const result = await axios.post(url, body, headers)
    setApiKey("bearer " + result.data.access_token)
  }

  // TOTAL ASSET COUNT
  const getAssetCount = async () => {
    const url = 'https://mv-api-usva.mediavalet.net/assets/search'
    const data = {
      "search": "",
      "count": 1,
      "offset": 0,
      "filters": "",
      //  AVI FIlter
      "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // no expiry date assets
      // "filters": "(DateExpired GT 9999-12-31T00:00:00.000Z)",
      "sort": "record.createdAt D",
      // category filter
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'b9027229-a714-4634-94d8-72cb318879c5') OR CategoryAncestorIds/ANY(c: c EQ 'b9027229-a714-4634-94d8-72cb318879c5'))"
    }
    const result = await axios.post(url, data, { headers: headers })
    setAssetCount(result.data.payload.assetCount)
  }

  // ITERATE OFFSET
  const getAssets = async (offset, dateFilter) => {
    const url = 'https://mv-api-usva.mediavalet.net/assets/search'
    // const url = `https://mv-api-usil.mediavalet.net/categories/aec0ba15-92bb-43d7-8095-ccf2662b1fec/assets?count=1000&offset=${offset}&sort=record.createdAt+D`
    const data = {
      "search": "",
      "count": 1000,
      "offset": offset,
      "filters": dateFilter,
      //  AVI FIlter
      "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      "sort": "record.createdAt D",
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'b9027229-a714-4634-94d8-72cb318879c5') OR CategoryAncestorIds/ANY(c: c EQ 'b9027229-a714-4634-94d8-72cb318879c5'))"
    }
    const tempAssets = await axios.post(url, data, { headers: headers })
    setAssets(assets => [...assets, ...tempAssets.data.payload.assets])
    if (assets < assetCount) {
      // if offset greater thyepan 100k (azure limit)
      if (offset >= 100000) {
        dateFilter = ("DateUploaded LE " + tempAssets.data.payload.assets[999].createdAt)
        getAssets(0, dateFilter)
      } else {
        offset += 1000
        getAssets(offset, dateFilter)
      }
    }
  }

  // get custom attributes mapping
  const getCustomAttributes = () => {
    let tempAttributes = new Map();
    const url = 'https://mv-api-usva.mediavalet.net/attributes'
    axios.get(url, { headers: headers })
      .then(res => {
        for (let attribute of res.data.payload) {
          tempAttributes.set(attribute.id, attribute.name)
        }
        setCusattributes(tempAttributes)
      })
  }

  // get cognative metadata IMAGE
  const getCognitiveImageMetadata = async () => {
    let promises = []
    let data = []
    for (let asset of assets) {
      if (asset.media.type === 'Image') {
        let tags = []
        let confidences = []
        let url = `https://mv-api-usva.mediavalet.net/assets/${asset.id}/autotags`
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
    Promise.all(promises).then(() => setCognitiveImageMetadata(data))
  }

  // get cognative metadata Status
  const getCognitiveVideoStatus = async (offset) => {
    let curAsset = assets[offset]
    if (curAsset.media.type === 'Video') {
      let url = `https://mv-api-usva.mediavalet.net/assets/${curAsset.id}/videoIntelligence/status`
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
    let url2 = `https://mv-api-usva.mediavalet.net/assets/${curAsset.id}/videoIntelligence/insights`
    // URL 2 insights (keywords) call
    await axios.get(url2, { headers: headers })
      .then(res => {
        let data = {
          AssetId: curAsset.id,
          AssetName: curAsset.file.fileName,
          Category: curAsset.categories,
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
    let url3 = `https://mv-api-usva.mediavalet.net/assets/${curAsset.id}/videoIntelligence/token`
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
        CategoryId: asset.Category,
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
        Versions: asset.record.version.version + 1,
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
      <div>
        <button onClick={getApiKey}>Authenticate</button>
        API KEY Set? {apiKey ? "Yes" : "No"}
      </div>
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
        <button onClick={getCognitiveImageMetadata}>Get Image Cognitive Metadata</button>
        {cognitiveImageMetadata.length}
      </div>
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
        <button onClick={filterAssets}>Filter Assets</button>
        {filteredAssets.length}
      </div>
      <div>
        <button onClick={filterCognitiveVideoMetadata}>Filter AVI VIDEO Assets</button>
      </div>
      <div>
        <CSVLink data={filteredAssets}>Export Metadata</CSVLink>
      </div>
      <div>
        <CSVLink data={cognitiveImageMetadata}>Export CognitiveMetadata</CSVLink>
      </div>
      <div>
        <CSVLink data={cognitiveVideoMetadata}>Export VIdeo CognitiveMetadata</CSVLink>
      </div>
    </div>
  );
}

export default App;
