// Language and Theme Toggle Functionality

// Prevent flash of unstyled content
document.documentElement.classList.add('preload');
window.addEventListener('load', () => {
	setTimeout(() => {
		document.documentElement.classList.remove('preload');
	}, 100);
});

// Initialize theme and language from localStorage
const initTheme = localStorage.getItem('theme') || 'light';
const initLang = localStorage.getItem('language') || 'en';

// Set initial theme
document.documentElement.setAttribute('data-theme', initTheme);

// Update theme toggle icon and tooltip
function updateThemeIcon(theme) {
	const themeToggle = document.getElementById('themeToggle');
	const icon = themeToggle.querySelector('i');
	const language = currentLanguage();

	if (theme === 'dark') {
		icon.className = 'fas fa-sun';
		themeToggle.setAttribute('aria-label', language === 'id' ? 'Ubah ke Mode Terang' : 'Switch to Light Mode');
		themeToggle.setAttribute('data-tooltip-en', 'Switch to Light Mode');
		themeToggle.setAttribute('data-tooltip-id', 'Ubah ke Mode Terang');
	} else {
		icon.className = 'fas fa-moon';
		themeToggle.setAttribute('aria-label', language === 'id' ? 'Ubah ke Mode Gelap' : 'Switch to Dark Mode');
		themeToggle.setAttribute('data-tooltip-en', 'Switch to Dark Mode');
		themeToggle.setAttribute('data-tooltip-id', 'Ubah ke Mode Gelap');
	}
}

// Update language toggle text
function updateLangText(lang) {
	const langToggle = document.getElementById('langToggle');
	const langText = langToggle.querySelector('.lang-text');

	if (lang === 'en') {
		langText.textContent = 'ID';
		langToggle.setAttribute('aria-label', 'Switch to Indonesian');
	} else {
		langText.textContent = 'EN';
		langToggle.setAttribute('aria-label', 'Ubah ke Bahasa Inggris');
	}
}

// Update all translatable elements
function updateLanguage(lang) {
	const elements = document.querySelectorAll('[data-en][data-id]');

	elements.forEach(element => {
		if (lang === 'en') {
			element.textContent = element.getAttribute('data-en');
		} else {
			element.textContent = element.getAttribute('data-id');
		}
	});

	document.querySelectorAll('[data-aria-en][data-aria-id]').forEach(element => {
		element.setAttribute('aria-label', element.getAttribute(lang === 'en' ? 'data-aria-en' : 'data-aria-id'));
	});

	// Update HTML lang attribute
	document.documentElement.setAttribute('lang', lang);
	updateThemeIcon(document.documentElement.getAttribute('data-theme'));

	if (document.getElementById('projectGallery')?.open) {
		updateGalleryView();
	}
}

const galleries = {
	'scopustrack': {
		title: { en: 'ScopusTrack', id: 'ScopusTrack' },
		images: [
			{
				src: 'assets/images/projects/scopustrack.webp', width: 1440, height: 810,
				alt: { en: 'ScopusTrack interface showing journal status statistics and search tools', id: 'Antarmuka ScopusTrack yang menampilkan statistik status jurnal dan alat pencarian' },
				title: { en: 'Overview', id: 'Ringkasan' },
				description: { en: 'Overview of journal status statistics, recent changes, search, and subject browsing.', id: 'Ringkasan status jurnal, perubahan terbaru, pencarian, dan penelusuran berdasarkan bidang.' }
			},
			{
				src: 'assets/images/projects/scopustrack-search.webp', width: 1440, height: 810,
				alt: { en: 'ScopusTrack journal search and filter interface', id: 'Antarmuka pencarian dan penyaringan jurnal ScopusTrack' },
				title: { en: 'Journal Search', id: 'Pencarian Jurnal' },
				description: { en: 'Search and filter sources by title, ISSN, publisher, status, and related metadata.', id: 'Pencarian dan penyaringan sumber berdasarkan judul, ISSN, penerbit, status, dan metadata terkait.' }
			},
			{
				src: 'assets/images/projects/scopustrack-discontinued.webp', width: 1440, height: 810,
				alt: { en: 'ScopusTrack monitoring view for discontinued journal sources', id: 'Tampilan pemantauan sumber jurnal yang dihentikan di ScopusTrack' },
				title: { en: 'Discontinued Sources', id: 'Sumber Dihentikan' },
				description: { en: 'Monitoring view for discontinued sources, including reason and year of change.', id: 'Tampilan pemantauan sumber yang dihentikan, termasuk alasan dan tahun perubahan.' }
			}
		]
	},
	'dp3m': {
		title: { en: 'DP3M Monitoring', id: 'DP3M Monitoring' },
		images: [
			{
				src: 'assets/images/projects/dp3m-eligibility.webp', width: 888, height: 1190,
				alt: { en: 'DP3M eligibility interface showing research grant eligibility criteria and status', id: 'Antarmuka eligibilitas DP3M yang menampilkan kriteria dan status kelayakan hibah penelitian' },
				title: { en: 'Individual Eligibility', id: 'Eligibilitas Individu' },
				description: { en: 'Lecturers can review eligible research schemes together with the evaluation context, eligibility status, and explainable criteria.', id: 'Dosen dapat melihat skema penelitian yang dapat diikuti beserta konteks evaluasi, status kelayakan, dan kriteria yang dapat ditelusuri.' }
			},
			{
				src: 'assets/images/projects/dp3m-dashboard.webp', width: 1145, height: 1450,
				alt: { en: 'DP3M aggregate dashboard showing research scheme readiness and faculty eligibility patterns', id: 'Dashboard agregat DP3M yang menampilkan kesiapan skema penelitian dan pola kelayakan fakultas' },
				title: { en: 'Institutional Monitoring', id: 'Monitoring Institusi' },
				description: { en: 'An aggregate dashboard for monitoring eligibility patterns and research-scheme readiness at the institutional level.', id: 'Dashboard agregat untuk memantau pola kelayakan dan kesiapan skema penelitian pada tingkat institusi.' }
			}
		]
	},
	'ml-demo': {
		title: { en: 'Machine Learning Demo', id: 'Machine Learning Demo' },
		images: [
			{
				src: 'assets/images/projects/ml-demo.webp', width: 1440, height: 810,
				alt: { en: 'Interactive linear regression demo showing training controls, data points, and fitted regression line', id: 'Demo regresi linear interaktif yang menampilkan kontrol training, titik data, dan garis regresi hasil training' },
				title: { en: 'Linear Regression', id: 'Regresi Linear' },
				description: { en: 'Interactive linear regression training with adjustable parameters, generated data, and fitted regression line.', id: 'Simulasi pelatihan regresi linear dengan parameter yang dapat diatur, data simulasi, dan garis regresi hasil training.' }
			},
			{
				src: 'assets/images/projects/ml-demo-overview.webp', width: 1440, height: 810,
				alt: { en: 'Machine Learning Demo collection of interactive supervised learning demonstrations', id: 'Kumpulan demo interaktif supervised learning pada Machine Learning Demo' },
				title: { en: 'Demo Collection', id: 'Kumpulan Demo' },
				description: { en: 'The teaching application provides interactive demonstrations for several supervised learning algorithms.', id: 'Aplikasi pembelajaran menyediakan demonstrasi interaktif untuk beberapa algoritma supervised learning.' }
			},
			{
				src: 'assets/images/projects/ml-demo-knn.webp', width: 1440, height: 810,
				alt: { en: 'Interactive K-nearest neighbors visualization with a two-dimensional feature space', id: 'Visualisasi K-nearest neighbors interaktif dengan ruang fitur dua dimensi' },
				title: { en: 'K-Nearest Neighbors', id: 'K-Nearest Neighbors' },
				description: { en: 'Interactive KNN visualization designed to explain classification using two-dimensional feature space.', id: 'Visualisasi KNN interaktif untuk menjelaskan proses klasifikasi menggunakan ruang fitur dua dimensi.' }
			}
		]
	}
};

const galleryDialog = document.getElementById('projectGallery');
const galleryTitle = document.getElementById('galleryTitle');
const galleryImage = document.getElementById('galleryImage');
const galleryCaptionTitle = document.getElementById('galleryCaptionTitle');
const galleryCaptionDescription = document.getElementById('galleryCaptionDescription');
const galleryThumbnails = document.getElementById('galleryThumbnails');
const galleryPrevious = document.getElementById('galleryPrevious');
const galleryNext = document.getElementById('galleryNext');
const galleryClose = document.getElementById('galleryClose');
let activeGallery = null;
let activeImageIndex = 0;
let galleryOpener = null;

function currentLanguage() {
	return document.documentElement.getAttribute('lang') || 'en';
}

function updateGalleryView() {
	if (!activeGallery) return;

	const language = currentLanguage();
	const gallery = galleries[activeGallery];
	const image = gallery.images[activeImageIndex];
	const hasMultipleImages = gallery.images.length > 1;

	galleryTitle.textContent = gallery.title[language];
	galleryImage.src = image.src;
	galleryImage.width = image.width;
	galleryImage.height = image.height;
	galleryImage.alt = image.alt[language];
	galleryCaptionTitle.textContent = image.title[language];
	galleryCaptionDescription.textContent = image.description[language];
	galleryClose.setAttribute('aria-label', language === 'id' ? 'Tutup galeri' : 'Close gallery');
	galleryPrevious.hidden = !hasMultipleImages;
	galleryNext.hidden = !hasMultipleImages;
	galleryPrevious.querySelector('span').textContent = language === 'id' ? 'Sebelumnya' : 'Previous';
	galleryNext.querySelector('span').textContent = language === 'id' ? 'Berikutnya' : 'Next';

	galleryThumbnails.replaceChildren();
	if (!hasMultipleImages) {
		galleryThumbnails.hidden = true;
		return;
	}

	galleryThumbnails.hidden = false;
	gallery.images.forEach((thumbnail, index) => {
		const button = document.createElement('button');
		const thumbnailImage = document.createElement('img');
		button.type = 'button';
		button.className = 'gallery-thumbnail';
		button.setAttribute('aria-current', String(index === activeImageIndex));
		button.setAttribute('aria-label', `${language === 'id' ? 'Lihat' : 'View'} ${thumbnail.title[language]}`);
		thumbnailImage.src = thumbnail.src;
		thumbnailImage.width = thumbnail.width;
		thumbnailImage.height = thumbnail.height;
		thumbnailImage.alt = '';
		button.append(thumbnailImage);
		button.addEventListener('click', () => {
			activeImageIndex = index;
			updateGalleryView();
		});
		galleryThumbnails.append(button);
	});
}

function openGallery(project, opener) {
	activeGallery = project;
	activeImageIndex = 0;
	galleryOpener = opener;
	updateGalleryView();
	galleryDialog.showModal();
	galleryClose.focus();
}

function moveGallery(step) {
	const images = galleries[activeGallery].images;
	activeImageIndex = (activeImageIndex + step + images.length) % images.length;
	updateGalleryView();
}

document.querySelectorAll('[data-gallery-open]').forEach(opener => {
	opener.addEventListener('click', () => openGallery(opener.dataset.galleryOpen, opener));
});

galleryPrevious.addEventListener('click', () => moveGallery(-1));
galleryNext.addEventListener('click', () => moveGallery(1));
galleryClose.addEventListener('click', () => galleryDialog.close());

galleryDialog.addEventListener('keydown', event => {
	if (event.key === 'ArrowLeft' && galleries[activeGallery].images.length > 1) {
		event.preventDefault();
		moveGallery(-1);
	}
	if (event.key === 'ArrowRight' && galleries[activeGallery].images.length > 1) {
		event.preventDefault();
		moveGallery(1);
	}
});

galleryDialog.addEventListener('close', () => {
	galleryOpener?.focus();
});

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';

	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	updateThemeIcon(newTheme);
});

// Language Toggle
document.getElementById('langToggle').addEventListener('click', () => {
	const currentLang = document.documentElement.getAttribute('lang') || 'en';
	const newLang = currentLang === 'en' ? 'id' : 'en';

	updateLanguage(newLang);
	localStorage.setItem('language', newLang);
	updateLangText(newLang);
});

// Initialize on page load
updateThemeIcon(initTheme);
updateLangText(initLang);
updateLanguage(initLang);

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
// Smooth scroll for anchor links (if any added in future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});
