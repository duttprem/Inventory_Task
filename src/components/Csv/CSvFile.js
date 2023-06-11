import React from 'react'
import "./Csvfile.css"

const CSvFile = () => {
  return (
    <div className='csvfile'>
        <div className="input-btn">

        <input type="file"  id='upload_file' />
        <button>Export CSV File</button>
        </div>
        <textarea  id="display_data" cols="60" rows="10"></textarea>
        </div>
  )
}

export default CSvFile