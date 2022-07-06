import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { CSVLink, CSVDownload } from "react-csv";

const App = () => {
  const [assets, setAssets] = useState([])
  const [assetCount, setAssetCount] = useState(0)
  const [filteredAssets, setFilteredAssets] = useState([])
  const [cognitiveMetadata, setCognitiveMetadata] = useState([])
  const [apiKey, setApiKey] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [attributes, setAttributes] = useState([])
  const headers = {
    'content-type': 'application/json',
    'authorization': apiKey
  }

  // AUTHENTICATE
  const getApiKey = async () => {
    const url = 'https://identity-va.mediavalet.net/token'
    const headers = { 'content-type': 'application/json' }
    const body = "grant_type=password&username=allenliadmin%40mediavalet.net&password=8Z9M7bR!&client_id=0cce9ca4-93a5-48a7-9e6a-29022fa16c51"
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
      "sort": "record.createdAt D"
    }
    const result = await axios.post(url, data, { headers: headers })
    setAssetCount(result.data.payload.assetCount)
  }

  // ITERATE OFFSET
  const getAssets = async (offset) => {
    const url = 'https://mv-api-usva.mediavalet.net/assets/search'
    // const url = `https://mv-api-usil.mediavalet.net/categories/aec0ba15-92bb-43d7-8095-ccf2662b1fec/assets?count=1000&offset=${offset}&sort=record.createdAt+D`
    const data = {
      "search": "",
      "count": 1000,
      "offset": offset,
      "filters": "",
      "sort": "record.createdAt D"
    }
    const tempAssets = await axios.post(url, data, { headers: headers })
    setAssets(assets => [...assets, ...tempAssets.data.payload.assets])
    if (offset < assetCount) {
      offset += 1000
      getAssets(offset)
    }
  }

  // get custom attributes mapping
  const getCustomAttributes = () => {
    let tempAttributes = []
    const url = 'https://mv-api-usva.mediavalet.net/attributes'
    axios.get(url, { headers: headers })
      .then(res => {
        for (let attribute of res.data.payload) {
          tempAttributes.push({
            id: attribute.id,
            name: attribute.name
          })
        }
        setAttributes(tempAttributes)
      })
  }

  // get cognative metadata
  const getCognitiveMetadata = () => {
    let promises = []
    let data = []
    for (let asset of assets) {
      if (asset.media.type === 'Image') {
        let tags = []
        let confidences = []
        let url = `https://mv-api-usil.mediavalet.net/assets/${asset.id}/autotags`
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
        ExpiryDate: new Date(asset.file.expiresAt),
        Versions: asset.record.version.version + 1,
        TotalViews: views
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
        Attribute Mapping Count: {attributes.length}
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
