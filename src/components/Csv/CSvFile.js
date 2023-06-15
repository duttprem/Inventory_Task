import React from "react";
import { useState } from "react";
import "./Csvfile.css";

function CSvFile() {
  const [csvData, setcsvData] = useState([]);
  const [edit, setedit] = useState(-1);

  function upload() {
    let files = document.getElementById("upload_file").files;
    if (files.length === 0) {
      alert("Please choose any file...");
      return;
    }
    let filename = files[0].name;
    let extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension === ".CSV") {
      //Here calling another method to read CSV file into json
      csvFileToJSON(files[0]);
    } else {
      alert("Please select a valid csv file.");
    }
  }
  //Method to read csv file and convert it into JSON
  function csvFileToJSON(file) {
    try {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        let csvData = [];
        let headers = [];
        let rows = e.target.result.split("\r\n");
        for (let i = 0; i < rows.length; i++) {
          let cells = rows[i].split(",");
          let rowData = {};
          for (let j = 0; j < cells.length; j++) {
            if (i === 0) {
              let headerName = cells[j].trim();
              headers.push(headerName);
            } else {
              let key = headers[j];
              if (key) {
                rowData[key] = cells[j].trim();
              }
            }
          }
          //skip the first row (header) data
          if (i !== 0) {
            csvData.push(rowData);
          }
        }
        setcsvData(csvData);
      };
    } catch (e) {
      console.error(e);
    }
  }
  function handleEdit(index) {
    setedit(index);
  }
  function handleSave(index) {
    const newData = [...csvData];
    newData[index] = {
      ...newData[index],
      ...Object.fromEntries(
        Array.from(document.querySelectorAll(`#row-${index} input`)).map(
          (input) => [input.name, input.value]
        )
      ),
    };
    setcsvData(newData);
    setedit(-1);
  }
  return (
    <div className="csvfile">
      <div className="input-btn">
        <input type="file" id="upload_file" />
        <button onClick={upload}>Export CSV File</button>
      </div>

      <table>
        <thead>
          <tr>
            {Object.keys(csvData[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index} id={`row-${index}`}>
              {Object.keys(row).map((key) => (
                <td key={key}>
                  {edit === index ? (
                    <input name={key} defaultValue={row[key]} />
                  ) : (
                    row[key]
                  )}
                </td>
              ))}
              <td>
                {edit === index ? (
                  <>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => setedit(-1)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <textarea  id="display_data" cols="60" rows="10"></textarea> */}
    </div>
  );
}

export default CSvFile;
