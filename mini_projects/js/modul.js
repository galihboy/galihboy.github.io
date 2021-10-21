// modul: Galih Hermawan @ https://galih.eu

var berkas;
var strURL;
var idApi;
var kodeModul;

//


jQuery.get('data.json', function (data) {
	berkas = data
	strURL = berkas.urlApi;
	idApi = berkas.id;
});

function PilihModul(angka){
	let isi;
	
	if (angka === 1) {
		let strPrima = $("#bilPrima").val();
		isi = strPrima
		idElement = "#outputPrima";
	}
	else if (angka === 2) {
		let strPrima1 = $("#bilPrimaDeret1").val();
		let strPrima2 = $("#bilPrimaDeret2").val();
		isi = strPrima1 + "," + strPrima2;
		idElement = "#outputPrimaDeret";
	}
	else if (angka === 3) {
		let strBacaBilangan = $("#inputBacaBilangan").val();
		isi = strBacaBilangan;
		idElement = "#outputBacaBilangan";
	}
	else if (angka === 4) {
		let strTulisBilangan = $("#inputTulisBilangan").val();
		isi = strTulisBilangan;
		idElement = "#outputTulisBilangan";
	} else if (angka === 5) {
		//jmlNama = $('#jumlahNama').find(":selected").text();
		isi = OlahNamaAcak();
		idElement = "#outputDaftarNama";
    }
	ProsesData(angka, idElement, isi)
}

function ProsesData(nomorModul, idElement, isi){
	const url = strURL + "?id=" + idApi + "&modul=" + nomorModul + "&isi=" + isi;
	console.log(url);
	fetch(url)
	.then(response => response.json())  
	.then(json => {

		const txtOutput = JSON.stringify(json);
		console.log("teks = " + txtOutput);
		IsiDataElement(idElement, json, nomorModul);
	})
}

function IsiDataElement(idElement, json, noModul) {	
	let isi = json["isi"];
	let status = json["status"];
	let strStatus;
	let strIsi;

	strIsi = isi;
	
	if (noModul == "1") {
		let strAngka;
		if (status == "Sukses") {
			strAngka = "Angka " + $("#bilPrima").val();
		} else {
			strAngka = "";
        }
		
		if (json["isi"] == true) {
			strIsi = strAngka + ": bilangan prima.";
		} else {
			strIsi = strAngka + ": bukan bilangan prima.";
		};
		$(idElement).removeClass().addClass("alert alert-success");
		//$('#top1 #s1').attr('class', 'alert alert-success');
	} else if (noModul == "2") {
		// jika data 'string', data tidak ditemukan
		if (typeof strIsi === 'string') {
			strIsi = isi;
		} else {
			// jika data object (array), value diperoleh
			strIsi = strIsi.join(", ");
		}
	}
	else if (noModul == "4") {
		// jika data 'string', data tidak ditemukan
		$(idElement).removeClass().addClass("alert alert-success");
		if (strIsi === 'Data tidak ditemukan.') {
			strIsi = isi;
			$(idElement).removeClass().addClass("alert alert-warning");
		} else {
			// jika data object (array), value diperoleh
			if ($("#pilihPenandaRibuan").is(":checked")) {
				//console.log(parseInt(strIsi).toLocaleString());
				strIsi = parseInt(strIsi).toLocaleString();
			}
			
		}
	} else if (noModul == "5") {
		// jika data 'string', data tidak ditemukan
		if (typeof strIsi === 'string') {
			strIsi = isi;
		} else {
			// jika data object (array), value diperoleh
			strIsi = strIsi.join("\r\n");
		}
	}

	if (status == "Error") {
		strIsi = status + ": " + isi;
		if (noModul == "1" || noModul == "4") {
			$(idElement).removeClass().addClass("alert alert-warning");
			//$('#top1 #s1').attr('class', 'alert alert-warning');
		}
	}

	if ($(idElement).is("span")) {
		$(idElement).html(strIsi);
	} else if ($(idElement).is("textarea")) {
		$(idElement).val(strIsi.toString());
    }
}

// untuk modul 5: nama acak
function OlahNamaAcak() {
	let strJmlNama;
	let strFormat;
	let pilSambungAbdul;
	let strSumber;
	const lstSumber = [];

	strFormat = $("#inputFormatNama").val();
	strJmlNama = $('#jumlahNama').find(":selected").text();

	if ($("#pilNamaNabi").is(":checked")){
		lstSumber.push("1")
	}
	if ($("#pilNamaSahabat").is(":checked")){
		lstSumber.push("2")
	}
	if ($("#pilNamaIslami").is(":checked")){
		lstSumber.push("3")
	}
	if ($("#pilNamaLaki").is(":checked")){
		lstSumber.push("4")
	}
	strSumber = lstSumber.join(",");

	if ($("#pilNamaAbdul").is(":checked")) {
		//console.log("sambung OK");
		pilSambungAbdul = "1";
	} else {
		//console.log("tidak sambung 1");
		pilSambungAbdul = "0";
	}
	// modul?id=galih.hermawan&modul=5&isi=x%20x&sumber=4&jumlah=10&sambung=0
	teksArgumen = strFormat + "&sumber=" + strSumber + "&jumlah=" + strJmlNama + "&sambung=" + pilSambungAbdul;
	//console.log("sambung: " + $("#pilNamaAbdul").is(":checked"));
	return teksArgumen;

}