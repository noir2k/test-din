import CSVReader from 'react-csv-reader';

const ImportCsv = () => {
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string, index: number) => {
      console.log(index, header);
      return header;
    },
  };

  const handleFileLoad = (data: any, fileInfo: any) => {
    console.log(data, fileInfo);
  };

  return (
    <CSVReader
      cssClass="csv-reader-input"
      onFileLoaded={handleFileLoad}
      // onError={this.handleDarkSideForce}
      parserOptions={papaparseOptions}
    />
  );
};

export default ImportCsv;
