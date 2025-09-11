async function populateSelectFromData(data, selectControl, defaultOptionText = "OXI", valueFieldIndex = 0, textFieldIndex = 1) {
    try {
        // Select menüsüne varsayılan bir seçenek ekle
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = defaultOptionText;
        defaultOption.selected = true;
        selectControl.appendChild(defaultOption);

        // 4. Her bir satırı işle ve select'e ekle
        data.forEach(columns => {
            // Her satırı virgülle ayır

            // Eğer satır boş değilse devam et
            if (columns.length >= 2) {
                const code = columns[valueFieldIndex].trim();
                const name = columns[textFieldIndex].trim();

                // Yeni bir <option> elementi oluştur
                const option = document.createElement('option');
                option.value = code;
                option.textContent = name;

                // Select'e option'ı ekle
                selectControl.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
    }
}

async function populateSelectFromCsv(csvFileUrl, selectControl, defaultOptionText = "OXI", valueFieldIndex = 0, textFieldIndex = 1, splitChar = ',') {
    try {

        // 1. Fetch ile dosyayı çek
        fetch(csvFileUrl).then(res => {
            if (res.status === 404) {
                throw new Error('Dosya bulunamadı (404)');
            }
            return res.text();
        }).then(csvText => {
            // 3. Metni satırlara ayır ve ilk satırı (başlıkları) atla
            const rows = csvText.split('\n').slice(1);

            return populateSelectFromData(rows, selectControl, defaultOptionText, valueFieldIndex, textFieldIndex, splitChar);

        }).catch(err => {
            throw new Error('Dosya yüklenirken bir hata oluştu: ' + err.message);
        });

    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
    }
}

/**
    * searces a CSV file for a value in a specific column and returns a value from another column in the same row.    
    * * @param {string} csvUrl - url of the CSV file.
    * @param {number} searchIndex - column index to search in.
    * @param {string} searchValue - search value to look for.
    * @param {number} returnIndex - return value from this column index.
    * @param {string} splitChar - split character, default is comma (,).
    * @returns {Promise<string|null>} -  found value or null if not found or error.
    */
async function findRowInCsv(csvUrl, searchIndex, searchValue, splitChar) {
    try {
        return getAllRowsFromCsv(csvUrl, splitChar).then(rows => {
            for (const row of rows) {
                // 5. conditional check
                if (row[searchIndex] === searchValue) {

                    // 6. match found, return the row
                    return row;
                }
            }

            // no match found
            console.warn(`"${searchValue}" value, ${searchIndex}. not found at index`);
            return null;
        }).catch(err => {
            throw new Error('Dosya yüklenirken bir hata oluştu: ' + err.message);
        });
    } catch (error) {
        console.error('An error occured while reading csv:', error);
        return null;
    }
}

async function findRowInData(data, searchIndex, searchValue) {
    try {
        for (const row of data) {
            // 5. conditional check
            if (row[searchIndex] === searchValue) {
                // 6. match found, return the row
                return row;
            }
        }
        // no match found
        console.warn(`"${searchValue}" value, ${searchIndex}. not found at index`);
        return null;

    } catch (error) {
        console.error('An error occured while reading csv:', error);
        return null;
    }
}

async function getAllRowsFromCsv(csvUrl, splitChar = ',') {
    try {
        // 1. fetch csv file
        const response = await fetch(csvUrl);

        // check if fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // 2. read text from response
        const csvText = await response.text();

        // 3. split text into rows and skip header
        const rows = csvText.split('\n').slice(1);
        return rows.map(row => row.split(splitChar).map(col => col.trim()));
    }
    catch (error) {
        console.error('An error occured while reading csv:', error);
        return null;
    }
}

