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

	if (theme === 'dark') {
		icon.className = 'fas fa-sun';
		themeToggle.setAttribute('data-tooltip-en', 'Switch to Light Mode');
		themeToggle.setAttribute('data-tooltip-id', 'Ubah ke Mode Terang');
	} else {
		icon.className = 'fas fa-moon';
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
	} else {
		langText.textContent = 'EN';
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

	// Update HTML lang attribute
	document.documentElement.setAttribute('lang', lang);
}

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

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
	// Ctrl/Cmd + K for theme toggle
	if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
		e.preventDefault();
		document.getElementById('themeToggle').click();
	}

	// Ctrl/Cmd + L for language toggle
	if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
		e.preventDefault();
		document.getElementById('langToggle').click();
	}
});

// Log initialization for debugging
console.log('🎨 Theme:', initTheme);
console.log('🌍 Language:', initLang);
console.log('✨ Homepage initialized successfully!');
