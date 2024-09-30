const HTMLParser = require('node-html-parser');

class DialogueBlocks {
	
	constructor(API, name, config) {
		this.API = API;
		this.name = name;
		this.config = config;
	}

	
    addModifiers () {
		this.API.addModifier('postText', this.modifyCharacterHeaders, 1, this);    
		this.API.addModifier('postExcerpt', this.modifyExcerpt, 1, this);    
	}

	modifyExcerpt(rendererInstance, text){
		rendererInstance.loadCommonData();
		let modifiedText = text.replaceAll(/{{theme:\s?([^}]+)?\s?}}/g,'');
		modifiedText = modifiedText.replaceAll(/{{\s?}}/g,'');
		modifiedText = modifiedText.replaceAll(/{{([^}]+)?}}/g,'$1: ');
		return modifiedText;
	}

	modifyCharacterHeaders(rendererInstance, text){
		// Get list of authors to use as characters
		rendererInstance.loadCommonData();
		const characters = rendererInstance.commonData.authors;
		
		// for testing purposes
		// this.API.createFile('[ROOT-FILES]/authors.json', JSON.stringify(characters), this);
		this.API.createFile('[ROOT-FILES]/context.json', JSON.stringify(rendererInstance.context), this);
		this.API.createFile(`[ROOT-FILES]/posttext_${Date.now()}.txt`, text, this);

		let oldRoot = HTMLParser.parse(text);
		
		// let newRoot = HTMLParser.parse('');
		this.API.createFile(`[ROOT-FILES]/oldroot_${Date.now()}.txt`, oldRoot.innerHTML, this);

		let theme = this.config.defaultTheme; // Default theme
		let defaultAvatar = rendererInstance.siteConfig.domain + '/media/plugins/dialogueBlocks/userunknown.png';

		let themeMatch = oldRoot.firstChild.innerText.match(/{{theme:\s?(.+)?}}/);
		if(themeMatch) {
			theme = themeMatch[1];
			oldRoot.removeChild(oldRoot.firstChild);
		}
		let styleHTML = `<link rel="stylesheet" href="${rendererInstance.siteConfig.domain}/media/plugins/dialogueBlocks/guildchat.css" />
		<link rel="stylesheet" href="${rendererInstance.siteConfig.domain}/media/plugins/dialogueBlocks/visualnovel.css" />
		<style>
		.guildchat {
		--background-color: ${this.config.gcBackgroundColor};
		--dialogue-color: ${this.config.gcDialogueColor};
		--text-color: ${this.config.gcTextColor};
		}
		.visualnovel {
		--border-color: ${this.config.vnBorderColor};
		--dialogue-background-color: ${this.config.vnBackgroundColor};
		--dialogue-text-color: ${this.config.vnDialogueColor};
		--portrait-max-height: ${this.config.vnPortraitHeight};
		}
		</style>`;
		let sectionStart = `<section class="dialogueSection ${theme}"></section>`;

		let newRoot = HTMLParser.parse(styleHTML+sectionStart);
		//let matchResults = [];
		
		let openBlock = null;
		let openSection = newRoot.lastChild;
		this.API.createFile('[ROOT-FILES]/newroot.txt', newRoot.innerHTML, this);
		
		this.API.createFile('[ROOT-FILES]/oldroot2.txt', oldRoot.innerHTML, this);
		oldRoot.childNodes.forEach(node => {
			let nameMatch = node.innerText.match(/{{(.+)?}}/);
			themeMatch = node.innerText.match(/{{theme:\s?(.+)?}}/);
			// If node matches {{theme: ...}}, end dialogue section and start a new one
			if(themeMatch) {
					if (themeMatch[1])
						theme = themeMatch[1];
					else
						theme = ''
					openSection = HTMLParser.parse(`<section class="dialogueSection ${theme}">`).firstChild;
					newRoot.appendChild(openSection);
					openBlock = null;
			} else if(theme === ''){
				openSection.appendChild(node);
			}else {
				//nameMatch = node.innerText.match(/{{(.+)?}}/);
				// If node contains {{...}}, end dialogue block and maybe start a new one
				if(nameMatch) {
					//matchResults.push(nameMatch);
					if (nameMatch[1]) { // If a character name exists inside {{}} start new dialogue block
						openBlock = HTMLParser.parse('<div class="dialogueBlock"></div>').firstChild;
						let char = characters.find((char => nameMatch[1] === char.name));

						if(char){ // If name is found in character list, use their avatar and description (styled name)
							let charImage = '';
							if(theme === 'visualnovel' && this.config.vnPortraits === "featuredImage")
								charImage = `<img class="characterPortrait" src="${char.featuredImage.url}">`;
								// openBlock.innerHTML = `<div class="characterLine"><img class="characterPortrait" src="${char.featuredImage.url}"><div class="characterName">${char.description}</div></div>`;
							else if (theme === 'guildchat' || (theme === 'visualnovel' && this.config.vnPortraits == "avatar"))
								charImage = `<img class="characterAvatar" src="${char.avatar}"></img>`;
								//openBlock.innerHTML = `<div class="characterLine"><img class="characterAvatar" src="${char.avatar}"><div class="characterName">${char.description}</div></div>`;
							let charName = `<div class="characterName">${nameMatch[1]}</div>`;
							if(theme === 'visualnovel' && this.config.vnNames === 'plaintext'){
								let charNameBasic = HTMLParser.parse(char.description).innerText;
								charName = `<div class="characterName">${charNameBasic}</div>`;
							} else if(theme === 'guildchat' || (theme === 'visualnovel' && this.config.vnNames === 'styled'))
							{
								charName = `<div class="characterName">${char.description}</div>`;
							}
							openBlock.innerHTML = `<div class="characterLine">${charImage}${charName}</div>`;
						} else if(theme === 'guildchat'){ // If no match is found, default avatar for guildchat, or no avatar otherwise
							openBlock.innerHTML = `<div class="characterLine"><img class="characterAvatar" src="${defaultAvatar}"><div class="characterName">${nameMatch[1]}</div></div>`;
						}
						else{
							openBlock.innerHTML = `<div class="characterLine"><div class="characterName">${nameMatch[1]}</div></div>`;
						}
						node.classList.value.forEach(cssclass => {
							openBlock.firstChild.classList.add(cssclass);
						});
						openSection.appendChild(openBlock);
					} else { // If line is empty {{}}, just end block
						openBlock = null;
					}
				} else { // If node doesn't match {{}}, just add to open block or section
					openBlock ? openBlock.appendChild(node) : openSection.appendChild(node);
				}
			}
		});
		// this.API.createFile('[ROOT-FILES]/parseroutput.txt', newRoot.innerHTML, this);
		let modifiedText = newRoot.innerHTML;

		// this.API.createFile('[ROOT-FILES]/matchresults.txt', JSON.stringify(matchResults), this);
		// this.API.createFile('[ROOT-FILES]/modifiedtext.txt', modifiedText, this);

		return modifiedText;
	}
}
module.exports = DialogueBlocks;
