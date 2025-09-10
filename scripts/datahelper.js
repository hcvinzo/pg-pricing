async function populateSelectFromCsv(csvFileUrl, selectControl, statusMessage) {
    try {
        statusMessage.textContent = 'Veriler yükleniyor...';

        // 1. Fetch ile dosyayı çek
        fetch(csvFileUrl).then(res => {
            if (res.status === 404) {
                throw new Error('Dosya bulunamadı (404)');
            }
            return res.text();
        }).then(csvText => {
            // 3. Metni satırlara ayır ve ilk satırı (başlıkları) atla
            const rows = csvText.split('\n').slice(1);

            // Select menüsüne varsayılan bir seçenek ekle
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Bir ülke seçin";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            selectControl.appendChild(defaultOption);

            // 4. Her bir satırı işle ve select'e ekle
            rows.forEach(row => {
                // Her satırı virgülle ayır
                const columns = row.split(',');

                // Eğer satır boş değilse devam et
                if (columns.length >= 2) {
                    const code = columns[0].trim();
                    const name = columns[1].trim();

                    // Yeni bir <option> elementi oluştur
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = name;

                    // Select'e option'ı ekle
                    selectControl.appendChild(option);
                }
            });

            statusMessage.textContent = 'Veriler başarıyla yüklendi.';
        }).catch(err => {
            throw new Error('Dosya yüklenirken bir hata oluştu: ' + err.message);
            statusMessage.textContent = 'Veriler yüklenirken bir hata oluştu. Lütfen konsolu kontrol edin.';
        });

    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
        statusMessage.textContent = 'Veriler yüklenirken bir hata oluştu. Lütfen konsolu kontrol edin.';
    }
}
