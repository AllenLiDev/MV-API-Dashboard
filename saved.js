import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { CSVLink, CSVDownload } from "react-csv";

const App = () => {
  const [assets, setAssets] = useState([])
  const [assetCount, setAssetCount] = useState(0)
  const [filteredAssets, setFilteredAssets] = useState([])
  const [cognitiveMetadata, setCognitiveMetadata] = useState([])
  const [apiKey, setApiKey] = useState('None')
  const [isLoading, setIsLoading] = useState(true)

  // AUTHENTICATE
  const getApiKey = async () => {
    const url = 'https://identity-va.mediavalet.net/token'
    const headers = { 'content-type': 'application/json' }
    const body = "grant_type=password&username=allenliadmin%40mediavalet.net&password=8Z9M7bR!&client_id=0cce9ca4-93a5-48a7-9e6a-29022fa16c51"
    const result = await axios.post(url, body, headers)
    setApiKey(result.data.access_token)
  }

  // TOTAL ASSET COUNT
  const getAssetCount = async () => {
    const url = 'https://mv-api-usva.mediavalet.net/assets/search'
    const headers = {
      'content-type': 'application/json',
      'authorization': apiKey
    }
    const data = {
      "search": "",
      "count": 1,
      "offset": 0,
      "filters": "",
      "sort": "record.createdAt D"
    }
    const result = await axios.post(url, data, { headers: headers })
    setAssetCount(result.data.payload.assetCount)
  }

  // ITERATE OFFSET
  const getAssets = (offset) => {
    const url = 'https://mv-api-usva.mediavalet.net/assets/search'
    const headers = {
      'content-type': 'application/json',
      'authorization': apiKey
    }
    let promises = []
    let tempAssets = []
    for (let i = 0; i < assetCount; i += offset) {
      let data = {
        "search": "",
        "count": 1000,
        "offset": offset,
        "filters": "",
        "sort": "record.createdAt D"
      }
      promises.push(
        axios.post(url, data, { headers: headers })
          .then(res => {
            tempAssets.push(...res.data.payload.assets)
          })
      )
    }
    Promise.all(promises).then(() => setAssets(tempAssets))
  }

  // get cognative metadata
  const getCognitiveMetadata = () => {
    const headers = {
      'content-type': 'application/json',
      'authorization': apiKey
    }
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
    Promise.all(promises).then(() => setCognitiveMetadata(data))
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
        Filename: asset.file.fileName,
        FileFormat: asset.file.fileType,
        Filesize: asset.file.sizeInBytes,
        MD5Hash: asset.file.md5,
        Categories: categories,
        Description: asset.file.description,
        Keywords: keywords,
        AltText: asset.altText,
        Dimensions: asset.file.imageWidth + " by " + asset.file.imageHeight,
        FrameRate: asset.file.frameRate,
        UploadDate: new Date(asset.file.uploadedAt),
        UploadedBy: asset.record.createdBy.username,
        Versions: asset.record.version.version + 1,
        TotalViews: views,
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
      </div>
      <div>
        <button onClick={getAssetCount}>Get Total Number of Assets</button>
        Total number of assets: {assetCount}
      </div>
      <div>
        <button onClick={() => getAssets(1000)}>Get All Assets</button>
        Number of Assets Retrieved: {assets.length}
        {/* Asset Componenents
        {assets.map(asset => (
          <div key={asset.id}> {asset.id} </div>
        ))} */}
      </div>
      <div>
        <button onClick={getCognitiveMetadata}>Get Cognitive Metadata</button>
      </div>
      <div>
        <button onClick={filterAssets}>Filter Assets</button>
      </div>
      <div>
        <CSVLink data={filteredAssets}>Export Metadata</CSVLink>
      </div>
      <div>
        <CSVLink data={cognitiveMetadata}>Export CognitiveMetadata</CSVLink>
      </div>
    </div>
  );
}

export default App;
