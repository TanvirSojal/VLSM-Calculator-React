class FileMaker{
    getCSV(data){
        // const dataHeaders = ["id", "name", "groupSize", "networkAddress", "gatewayAddress", "broadcastAddress"];
        const csvHeaders = "ID, Name, Size, Network Address, Gateway Address, Broadcast Address";
        const csvRows = [csvHeaders];

        for (const row of data){
            const id = row["id"];
            const name = row["name"];
            const size = row["groupSize"];
            const netId = row["networkAddress"].addressNotation;
            const gatewayId = row["gatewayAddress"].addressNotation;
            const broadcastid = row["broadcastAddress"].addressNotation;
            
            const values = [id, name, size, netId, gatewayId, broadcastid];
            for (let i = 0; i < values.length; i++){
                values[i] = `"${values[i]}"`;
            }
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    downloadAsCSV(data){
        const csv = this.getCSV(data);
        const blob = new Blob([csv], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Allocation_Result.csv');
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
    }
}

export default FileMaker;