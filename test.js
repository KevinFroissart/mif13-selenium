const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require("assert");

async function demo() {
	const chromeOptions = new chrome.Options()
	chromeOptions.addArguments('--headless')

	const driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(chromeOptions)
			.build()

	try {
		// Se diriger sur une page web
		console.log('Looking for a web page to visit...');
		console.log('Visiting https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF13/');
		await driver.get("https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF13/");

		// Récupérer le titre de la page
		const title = await driver.getTitle();
		console.log('Title of the page is ', title);

		// Test d'assertion natif
		// Possibilité de combiner avec Mocha/lambatest/Nightwatch/Jasmine
		assert.strictEqual(title, "M1IF13 - Web Avancé, Web Mobile");

		// Récupération d'un élément en fonction de son ID
		let deroulementModule = await driver.findElement(By.id("déroulement-du-module")).getText();
		// let deroulementModule = await driver.findElement(By.xpath("//*[@id='déroulement-du-module']")).getText();

		console.log('id #déroulement-du-module has for text: ', deroulementModule);
		assert.strictEqual(deroulementModule, "Déroulement du module");

		// Récupération d'un lien via une requête xpath
		let lienForge = await driver.findElement(By.xpath("//a[@href='https://forge.univ-lyon1.fr/m1if13/m1if13-2022']"));
		let lienForgeText = await lienForge.getAttribute("href");
		console.log("Looking for a link using xpath:", lienForgeText);

		// Activation du lien
		await lienForge.click();
		console.log('Clicking on', lienForgeText);

		// Récupération du titre de la nouvelle page
		let titreForge = await driver.getTitle();
		console.log('The title of the new page is ', titreForge);

		// Confirmantion que nous avons bien changé de page
		assert.strictEqual(titreForge, "M1IF13 / M1if13 2022 · GitLab");

		// Failing test
		assert.strictEqual(titreForge, "Example");
	} finally {
		console.log("Closing the browser...");
		await driver.quit();
		console.log("\n\n\n");
	}
}

demo().catch(e => {
	console.error(e);
	process.exitCode = 1;
});
