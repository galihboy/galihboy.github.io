/**
 * Modul: Galih Hermawan @ https://galih.eu
 * Refactored for modern JS, async/await, and better UX.
 */

const AppConfig = {
	apiUrl: "https://galihboy-io-api.vercel.app/modul", // Default fallback
	userId: "galih.hermawan", // Default fallback
	isLoaded: false,

	async init() {
		try {
			const response = await fetch('data.json');
			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();
			this.apiUrl = data.urlApi;
			this.userId = data.id;
			console.log('App configuration loaded from data.json');
		} catch (error) {
			console.warn('Using default configuration. Failed to load data.json (likely due to CORS/file protocol):', error);
			// We suppress the alert because we have valid defaults
		} finally {
			this.isLoaded = true;
		}
	}
};

// Initialize config on load
document.addEventListener('DOMContentLoaded', () => {
	AppConfig.init();
});

/**
 * Main handler for module actions
 * @param {number} moduleNumber - The module ID (1-7)
 */
async function PilihModul(moduleNumber) {
	if (!AppConfig.isLoaded) {
		await AppConfig.init();
	}

	let inputContent = '';
	let outputElementId = '';
	let triggeringButtonId = '';

	// 1. Gather Input Data
	try {
		switch (moduleNumber) {
			case 1: // Cek Prima
				inputContent = $("#bilPrima").val();
				outputElementId = "#outputPrima";
				triggeringButtonId = "#btnPrima";
				break;
			case 2: // Deret Prima
				const p1 = $("#bilPrimaDeret1").val();
				const p2 = $("#bilPrimaDeret2").val();
				inputContent = `${p1},${p2}`;
				outputElementId = "#outputPrimaDeret";
				triggeringButtonId = "#btnDeretPrima";
				break;
			case 3: // Baca Bilangan
				inputContent = $("#inputBacaBilangan").val();
				outputElementId = "#outputBacaBilangan";
				triggeringButtonId = "#btnBacaBilangan";
				break;
			case 4: // Tulis Bilangan
				inputContent = encodeURIComponent($("#inputTulisBilangan").val());
				outputElementId = "#outputTulisBilangan";
				triggeringButtonId = "#btnTulisBilangan";
				break;
			case 5: // Nama Acak
				inputContent = OlahNamaAcak();
				outputElementId = "#outputDaftarNama";
				triggeringButtonId = "#btnBuatNama";
				break;
			case 6: // Jumlah Salaman
				inputContent = $("#jmlOrang").val();
				outputElementId = "#outputJmlSalaman";
				triggeringButtonId = "#btnJmlSalaman";
				break;
			case 7: // Faktorisasi Prima
				inputContent = $("#inputFaktorPrima").val();
				outputElementId = "#outputFaktorPrima";
				triggeringButtonId = "#btnFaktorPrima";
				break;
			default:
				console.error('Modul tidak dikenali');
				return;
		}

		// 2. Set Loading State
		setLoadingState(triggeringButtonId, true);
		$(outputElementId).removeClass("alert alert-success alert-danger alert-warning").text(''); // Clear previous output

		// 3. Process Data via API
		await ProsesData(moduleNumber, outputElementId, inputContent);

	} catch (error) {
		console.error('Error in PilihModul:', error);
		if (outputElementId) {
			$(outputElementId).text('Terjadi kesalahan internal.');
		}
	} finally {
		// 4. Reset Loading State
		setLoadingState(triggeringButtonId, false);
	}
}

/**
 * Sends data to the API and handles the response
 */
async function ProsesData(moduleNumber, outputElementId, content) {
	const url = `${AppConfig.apiUrl}?id=${AppConfig.userId}&modul=${moduleNumber}&isi=${content}`;
	console.log(`Requesting: ${url}`);

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

		const json = await response.json();
		const txtOutput = JSON.stringify(json);
		// console.log("Response:", txtOutput);

		IsiDataElement(outputElementId, json, moduleNumber);

	} catch (error) {
		console.error('API Request Failed:', error);
		$(outputElementId).text(`Gagal menghubungi server: ${error.message}`);
	}
}

/**
 * Formats and displays the API response in the UI
 */
function IsiDataElement(elementId, json, moduleNumber) {
	const isi = json.isi;
	const status = json.status;
	let displayContent = isi;
	const isTextarea = $(elementId).is("textarea");

	// Default cleanup: Remove only alert classes to preserve form-control
	$(elementId).removeClass("alert alert-success alert-danger alert-warning");

	if (status === "Error") {
		displayContent = `${status}: ${isi}`;
		// Only apply alert classes to non-textarea elements
		if (!isTextarea) {
			$(elementId).addClass("alert alert-danger");
		}
	} else {
		// Success Handling per Module
		switch (moduleNumber) {
			case 1: // Cek Prima
				const inputVal = $("#bilPrima").val();
				const prefix = status === "Sukses" ? `Angka ${inputVal}` : "";
				const resultText = json.isi === true ? "bilangan prima." : "bukan bilangan prima.";
				displayContent = `${prefix}: ${resultText}`;
				if (!isTextarea) {
					$(elementId).addClass("alert alert-success");
				}
				break;

			case 2: // Deret Prima
				if (Array.isArray(isi)) {
					displayContent = isi.join(", ");
				}
				break;

			case 4: // Tulis Bilangan
				if (displayContent === 'Data tidak ditemukan.') {
					if (!isTextarea) {
						$(elementId).addClass("alert alert-warning");
					}
				} else {
					if ($("#pilihPenandaRibuan").is(":checked")) {
						displayContent = parseInt(displayContent).toLocaleString();
					}
					if (!isTextarea) {
						$(elementId).addClass("alert alert-success");
					}
				}
				break;

			case 5: // Nama Acak
				if (Array.isArray(isi)) {
					displayContent = isi.join("\r\n");
				}
				break;

			case 6: // Jabat Tangan
				if (status === "Sukses") {
					displayContent = `Terdapat ${isi} jabat tangan dalam ${$("#jmlOrang").val()} orang.`;
					if (!isTextarea) {
						$(elementId).addClass("alert alert-success");
					}
				}
				break;

			case 7: // Faktorisasi Prima
				if (status === "Sukses" && Array.isArray(isi)) {
					displayContent = `Faktor bilangan dari ${$("#inputFaktorPrima").val()} adalah ${isi[0]}\n` +
						`Hasil perkalian = ${isi[1]}\n` +
						`Faktor prima = ${isi[2]}\n` +
						`Bentuk sederhana = ${isi[3]}`;
				}
				break;

			// Module 3 uses default displayContent
		}
	}

	// Render logic
	if ($(elementId).is("span") || $(elementId).is("div")) {
		$(elementId).html(displayContent);
	} else if ($(elementId).is("textarea")) {
		$(elementId).val(displayContent.toString());
	}
}

/**
 * Helper to toggle button loading state
 */
function setLoadingState(btnId, isLoading) {
	const btn = $(btnId);
	if (!btn.length) return;

	if (isLoading) {
		const originalText = btn.val() || btn.text();
		btn.data('original-text', originalText);
		btn.prop('disabled', true);
		btn.val('Loading...').text('Loading...');
	} else {
		const originalText = btn.data('original-text') || 'Proses';
		btn.prop('disabled', false);
		btn.val(originalText).text(originalText);
	}
}

/**
 * Helper for Module 5 (Random Name Generator) argument parsing
 */
function OlahNamaAcak() {
	const strFormat = $("#inputFormatNama").val();
	const strJmlNama = $('#jumlahNama').find(":selected").text();

	const lstSumber = [];
	if ($("#pilNamaNabi").is(":checked")) lstSumber.push("1");
	if ($("#pilNamaSahabat").is(":checked")) lstSumber.push("2");
	if ($("#pilNamaIslami").is(":checked")) lstSumber.push("3");
	if ($("#pilNamaLaki").is(":checked")) lstSumber.push("4");

	const strSumber = lstSumber.join(",");
	const pilSambungAbdul = $("#pilNamaAbdul").is(":checked") ? "1" : "0";

	return `${encodeURIComponent(strFormat)}&sumber=${strSumber}&jumlah=${strJmlNama}&sambung=${pilSambungAbdul}`;
}