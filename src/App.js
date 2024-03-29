import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { CSVLink, CSVDownload } from "react-csv";
import fileDownload from 'js-file-download';
import { observer } from "mobx-react" // Or "mobx-react".
import Assets from './components/Assets';
import { StoreContextProvider } from './context/store.context';

const App = () => {
  const [assets, setAssets] = useState([])
  const [assetCount, setAssetCount] = useState(0)
  const [filteredAssets, setFilteredAssets] = useState([])
  const [cognitiveImageMetadata, setCognitiveImageMetadata] = useState([])
  const [cognitiveVideoMetadata, setCognitiveVideoMetadata] = useState([])
  const [cognitiveVideoIds, setCognitiveVideoIds] = useState([])
  const [lastDate, setLastDate] = useState("")
  const [aviTokens, setAviTokens] = useState([])
  const [apiKey, setApiKey] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [cusattributes, setCusattributes] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [clientId, setClientId] = useState("0cce9ca4-93a5-48a7-9e6a-29022fa16c51")
  const [apiUrl, setApiUrl] = useState("https://api-usva.mediavalet.net/")
  const [authUrl, setAuthUrl] = useState('https://identity-va.mediavalet.net/')
  const [modernApiUrl, setModernApiURL] = useState("https://mv-api-eunl.mediavalet.net/")
  const [users, setUsers] = useState([])
  const [iptcMetadata, setIptcMetadata] = useState([])
  const [exifMetadata, setExifMetadata] = useState([])
  const [xmpMetadata, setXmpMetadata] = useState([])
  const [cdnLinks, setCdnLinks] = useState([])
  const [containerFilter, setContainerFilter] = useState()

  const headers = {
    'content-type': 'application/json',
    'authorization': apiKey
  }

  const statusStore = {
    "0": "approved",
    "2": "pending",
    "5": "rejected",
    "7": "expired",
    "9": "checked out",
  }

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
      "filters": "",
      // fle extenson
      // "filters": "(FileExtension EQ 'XML')",
      //  AVI FIlter
      // "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // "filters": "(((DateSoftDeleted GE 2022-08-30T00:00:00.000Z AND DateSoftDeleted LE 2022-11-28T23:59:59.000Z) AND Status EQ 10))",
      "includeSoftDeleted": true,
      // no expiry date assets
      // "filters": "((DateSoftDeleted GT 2023-02-17T23:04:05.963Z AND Status EQ 10))",
      "sort": "record.createdAt A",
      // category filter current cat without nested
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'bbee6851-54dd-4f9e-b82a-645eab1c4f4e'))"
      // category filter with nested
      "containerfilter": containerFilter
    }
    const result = await axios.post(url, data, { headers: headers })
    setAssetCount(result.data.payload.assetCount)
  }

  // ITERATE OFFSET 
  const getAssets = async (offset) => {
    const url = `${apiUrl}assets/search`
    // const url = `${apiUrl}categories/aec0ba15-92bb-43d7-8095-ccf2662b1fec/assets?count=1000&offset=${offset}&sort=record.createdAt+D`
    const data = {
      "search": "",
      "count": 1000,
      "offset": offset,
      "filters": lastDate,
      // "filters": `(((DateSoftDeleted GE 2022-08-30T00:00:00.000Z AND DateSoftDeleted LE 2022-11-28T23:59:59.000Z) AND Status EQ 10 ${dateFilter? "AND" + dateFilter:""}))`,
      "includeSoftDeleted": true,
      // "filters": (dateFilter === undefined) ? "((FileExtension EQ 'XML'))" : "(" + dateFilter + " AND (FileExtension EQ 'XML'))",
      //  AVI FIlter
      // "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // filter filetype
      // filters: "((DateSoftDeleted GT 2023-01-1T23:04:05.963Z AND Status EQ 10))",
      // filters: "(((DateSoftDeleted GE 2023-01-01T00:00:00.000Z AND DateSoftDeleted LE 2023-03-31T23:59:59.000Z) AND Status EQ 10))"
      "sort": "record.createdAt D",
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'bbee6851-54dd-4f9e-b82a-645eab1c4f4e'))"
      // category filter with nested
      "containerfilter": containerFilter
    }
    // console.log(offset, lastDate)
    await axios.post(url, data, { headers: headers })
      .then((res) => {
        // filterMD5(res.data.payload.assets)
        filterAssets(res.data.payload.assets)
        return ("DateUploaded LE " + res.data.payload.assets[res.data.payload.assets.length - 1].file.uploadedAt)
      })
      .then((date) => {
        if (filteredAssets.length < assetCount) {
          if (offset < 99999) {
            offset += 1000
            getAssets(offset)
          } else {
            setLastDate(date)
            console.log("100k metadata finished. Please export Data.")
          }
        }
        //console.log(offset, filteredAssets.length, date)
      })
  }

  // ITERATE OFFSET
  const getMD5 = async (offset) => {
    const url = `${apiUrl}assets/search`
    // const url = `${apiUrl}categories/aec0ba15-92bb-43d7-8095-ccf2662b1fec/assets?count=1000&offset=${offset}&sort=record.createdAt+D`
    const data = {
      "search": "",
      "count": 1000,
      "offset": offset,
      "filters": lastDate,
      // "filters": `(((DateSoftDeleted GE 2022-08-30T00:00:00.000Z AND DateSoftDeleted LE 2022-11-28T23:59:59.000Z) AND Status EQ 10 ${dateFilter? "AND" + dateFilter:""}))`,
      // "includeSoftDeleted": true,
      // "filters": (dateFilter === undefined) ? "((FileExtension EQ 'XML'))" : "(" + dateFilter + " AND (FileExtension EQ 'XML'))",
      //  AVI FIlter
      // "filters": "((AssetType EQ Video AND (videoIntelligence NE null AND videoIntelligence/videoIndexerId NE '')))",
      // filter filetype
      // filters: "((DateExpired GE 2023-04-01T00:00:00.000Z AND DateExpired LE 2023-06-30T23:59:59.000Z))",
      "sort": "record.createdAt A",
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'bbee6851-54dd-4f9e-b82a-645eab1c4f4e'))"
      // category filter with nested
      // "containerfilter": "(CategoryIds/ANY(c: c EQ 'bbee6851-54dd-4f9e-b82a-645eab1c4f4e') OR CategoryAncestorIds/ANY(c: c EQ 'bbee6851-54dd-4f9e-b82a-645eab1c4f4e'))"
    }
    // console.log(offset, lastDate)
    await axios.post(url, data, { headers: headers })
      .then((res) => {
        filterMD5(res.data.payload.assets)
        return ("DateUploaded GE " + res.data.payload.assets[res.data.payload.assets.length - 1].file.uploadedAt)
      })
      .then((date) => {
        if (filteredAssets.length < assetCount) {
          if (offset < 99999) {
            offset += 1000
            getMD5(offset)
          } else {
            setLastDate(date)
            console.log("100k MD5 finished. Please export Data.")
          }
        }
        //console.log(offset, filteredAssets.length, date)
      })
  }

  // get custom attributes mapping
  const getCustomAttributes = () => {
    let tempAttributes = new Map();
    let csvHeaders = {
      AssetId: "test",
      Title: "",
      MD5Hash: "",
      Categories: "",
      Description: "",
      Keywords: "",
      AltText: "",
      UploadDate: "",
      UploadedBy: "",
      ExpiryDate: "",
      Versions: "",
      TotalViews: ""
    }
    const url = `${apiUrl}attributes`
    axios.get(url, { headers: headers })
      .then(res => {
        for (let attribute of res.data.payload) {
          tempAttributes.set(attribute.id, attribute.name)
          csvHeaders[attribute.name] = ""
        }
        setCusattributes(tempAttributes)
        setFilteredAssets([csvHeaders])
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

  // const storeToTemp = () => {
  //   localStorage.setItem('tempMeta', JSON.stringify(assets));
  // }

  // get cognative metadata IMAGE
  const getCognitiveImageMetadata = async () => {
    let promises = []
    let data = []
    let count = 0
    for (let asset of filteredAssets) {
      if (count >= 15000 && count < 15999) {
        let tags = []
        let confidences = []
        let url = `${apiUrl}assets/${asset.AssetId}/autotags`
        promises.push(
          axios.get(url, { headers: headers })
            .then(res => {
              for (let tag in res.data.payload.tags) {
                tags.push(res.data.payload.tags[tag].name)
                confidences.push(res.data.payload.tags[tag].confidence)
              }
              let tempMetadata = {
                AssetId: asset.AssetId,
                Tags: tags,
                Confidence: confidences
              }
              data.push(tempMetadata)
            })
        )
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

  // filter data for only MD5 and asset Id
  const filterMD5 = (tempAssets) => {
    let tempMD5 = []
    for (let asset of tempAssets) {
      let categories = []
      for (let category in asset.categories) {
        categories.push(asset.categories[category])
      }
      let temp = {
        AssetId: asset.id,
        MD5Hash: asset.file.md5,
        Categories: categories,
        UploadDate: new Date(asset.file.uploadedAt)
      }
      tempMD5.push(temp)
    }
    setFilteredAssets(filteredAssets => [...filteredAssets, ...tempMD5])
  }

  // filter data for export to csv
  const filterAssets = (tempAssets) => {
    let tempFilteredAssets = []
    for (let asset of tempAssets) {
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
        TotalViews: views,
        AssetStatus: statusStore[asset.status]
      }
      // custom attributes with mapping
      for (let attribute in asset.attributes) {
        filtered[cusattributes.get(attribute)] = (asset.attributes[attribute]).replace(/,/g, ';')
      }
      tempFilteredAssets.push(filtered)
    }
    setFilteredAssets(filteredAssets => [...filteredAssets, ...tempFilteredAssets])
  }

  const generateCDNLinks = () => {
    for (let i = 1; i < filteredAssets.length; i += 199) {
      if (filteredAssets.length - i > 200) {
        setTimeout(() => {
          generateCDNLinksBatch(i, 200)
        }, i * 400);
      } else {
        setTimeout(() => {
          generateCDNLinksBatch(i, (filteredAssets.length - i))
        }, i * 400);
      }
    }
  }

  const generateCDNLinksBatch = (offset, max) => {
    for (let count = offset; count < (offset + max); count++) {
      let url = `${modernApiUrl}directlinks/${filteredAssets[count].AssetId}`
      let body = {
        "renditionSettings": {
          "size": {
            "type": "Large",
            "width": filteredAssets[count]['Image Width'],
            "height": filteredAssets[count]['Image Height']
          },
          "format": filteredAssets[count]['File Type']
        },
        "linkSettings": {
          "isEmbedCode": false,
          "isDevModeEnabled": false,
          "isUniqueLink": false,
          "turnSubtitlesOn": false,
          "linkName": "Default"
        }
      }
      axios.post(url, body, { headers: headers })
        .then((res) => {
          let temp = {
            AssetId: res.data.payload.directLinkId,
            CdnLink: res.data.payload.cdnLink
          }
          setCdnLinks(cdnLinks => [...cdnLinks, temp])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const getXMP = () => {
    for (let count = 0; count < assetCount; count += 1000) {
      setTimeout(() => {
        if ((assetCount - count) < 1000) {
          getXmpMetadataLoop(count, (assetCount - count))
        } else {
          getXmpMetadataLoop(count, 1000)
        }
      }, count * 60);
    }
  }

  const getEXIF = () => {
    for (let count = 0; count < assetCount; count += 1000) {
      setTimeout(() => {
        if ((assetCount - count) < 1000) {
          getExifMetadataLoop(count, (assetCount - count))
        } else {
          getExifMetadataLoop(count, 1000)
        }
      }, count * 60);
    }
  }

  const getIPTC = () => {
    for (let count = 0; count < assetCount; count += 1000) {
      setTimeout(() => {
        if ((assetCount - count) < 1000) {
          getIptcMetadataLoop(count, (assetCount - count))
        } else {
          getIptcMetadataLoop(count, 1000)
        }
      }, count * 60);
    }
  }

  const getXmpMetadataLoop = (count, max) => {
    for (let i = count; i < (count + max); i++) {
      const url = `${apiUrl}assets/${filteredAssets[i].AssetId}/xmp`
      axios.get(url, { headers: headers })
        .then((res) => {
          let value = {
            AssetId: filteredAssets[i].AssetId
          }
          for (let attribute of res.data.payload) {
            let { propertyValue, propertyName } = attribute
            value[propertyName] = propertyValue
          }
          setXmpMetadata(xmpMetadata => [...xmpMetadata, value])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const getIptcMetadataLoop = (count, max) => {
    for (let i = count; i < (count + max); i++) {
      const url = `${apiUrl}assets/${filteredAssets[i].AssetId}/iptc`
      axios.get(url, { headers: headers })
        .then((res) => {
          let value = {
            AssetId: filteredAssets[i].AssetId
          }
          for (let attribute of res.data.payload) {
            let { propertyValue, propertyName } = attribute
            value[propertyName] = propertyValue
          }
          setIptcMetadata(iptcMetadata => [...iptcMetadata, value])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const getExifMetadataLoop = (count, max) => {
    for (let i = count; i < (count + max); i++) {
      const url = `${apiUrl}assets/${filteredAssets[i].AssetId}/exif`
      axios.get(url, { headers: headers })
        .then((res) => {
          let value = {
            AssetId: filteredAssets[i].AssetId
          }
          for (let attribute of res.data.payload) {
            let { propertyValue, propertyName } = attribute
            value[propertyName] = propertyValue
          }
          setExifMetadata(exifMetadata => [...exifMetadata, value])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
  }, [])


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleContainerFilterChange = (e) => {
    setContainerFilter(`(CategoryIds/ANY(c: c EQ '${e.target.value}') OR CategoryAncestorIds/ANY(c: c EQ '${e.target.value}'))`)
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
        setApiUrl('https://mv-api-usca.mediavalet.net/')
        setAuthUrl('https://identity-ca.mediavalet.net/')
        break;
      case 'usva':
        setApiUrl('https://api-usva.mediavalet.net/')
        setAuthUrl('https://identity-va.mediavalet.net/')
        setModernApiURL('https://mv-api-usva.mediavalet.net/')
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
            <option value="usva">USVA</option>
            <option value="usca">USCA</option>
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
        <button onClick={getCustomAttributes}>Get Custom Attributes Mapping</button>
        Attribute Mapping Count: {cusattributes.size}
      </div>
      <div>
        <button onClick={() => getAssets(0)}>Get All Metadata</button>
      </div>
      <div>
        <form>
          <label>Category ID</label>
          <input
            name="Container Filter"
            type="text"
            onChange={handleContainerFilterChange} />
        </form>
      </div>
      <div>
        <button>Get Embedded Metadata</button>
      </div>
      <div>
        <button onClick={() => getMD5(0)}>Get MD5</button>
      </div>
      <div>
        Number of Assets {filteredAssets.length}
      </div>
      <div>
        Date {lastDate}
      </div>
      {/* <div>
        <button onClick={storeToTemp}>Store To Local</button>
      </div> */}
      {/* <div>
        <button onClick={getCategoryPath}>Get Category Paths</button>
      </div> */}
      <div>
        <CSVLink data={filteredAssets}>Export Metadata</CSVLink>
      </div>
      <div>
        <button onClick={() => setFilteredAssets([])}>Reset Data</button>
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
        <button onClick={() => setCognitiveImageMetadata([])}>Reset CM</button>
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
      <br />
      {/* <StoreContextProvider>
        <Assets />
      </StoreContextProvider> */}
      <br />
      <div>
        <button onClick={() => generateCDNLinks()}>Generate CDN Links</button>
        <br />Total Links Generated: {cdnLinks.length}
      </div>
      <div>
        <CSVLink data={cdnLinks}>Export CDN Links Created</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={() => getIPTC()}>get IPTC</button>
        {iptcMetadata.length}
      </div>
      <div>
        <CSVLink data={iptcMetadata}>Export IPTC Metadata</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={() => getEXIF()}>Get EXIF</button>
        {exifMetadata.length}
      </div>
      <div>
        <CSVLink data={exifMetadata}>Export EXIF Metadata</CSVLink>
      </div>
      <br />
      <div>
        <button onClick={() => getXMP()}>Get XMP</button>
        {xmpMetadata.length}
      </div>
      <div>
        <CSVLink data={xmpMetadata}>Export XMP Metadata</CSVLink>
      </div>
    </div>
  );
}

export default observer(App);
