# DialogueBlocks for Publii

This plugin for Publii is designed to format posts into one a few dialogue formats, enabling authors to write dialogue between characters and post it in a simple script format, utilizing Publii's WYSIWYG editor to create rich text without having to know HTML or CSS.

## Description

This plugin uses the Authors functionality of Publii to manage a cast of characters, and turn scripts with those characters into formatted dialogue blocks.

For example, the following script:

```
{{David}}

Wow, look, I can talk!

{{Venus}}

A statue... that can talk... and it's talking to me!?

{{}}

An anonymous museum guest stops to scoff.

{{Museum Guest}}

But you're a statue, too!
```

This can be rendered multiple ways depending on the chosen theme and settings, using information from the Publii authors:

![Two screenshots of the above dialogue, one rendered in a text chat similar to discord with avatars, and another in a visual novel style with larger character portraits above each piece of dialogue.](/dialoguesample.png)

Different themes, like "guildchat" and "visualnovel", can be used for different posts, or switched between posts (as well as unmodified text).

The author "description" field can be used to create a formatted name for each character with Publii's WYSIWYG editor, allowing rich text formatting like coloured usernames in the chat theme. Styling in the script itself will also be preserved, allowing coloured text, different fonts or text sizes, or any other changes done in the WYSIWYG editor. Posts made in Publii's Block Editor and Markdown Editor are also supported (note: in the markdown editor, you'll need to manually enter two new lines after each line for the script to be formatted correctly)

### Dependencies

This has only been tested on Publii's default theme, "Simple". It may work on other themes, but will require author avatars and author featured images to be supported.

In addition, **this plugin requires the setting "Display Authors w/o Posts" to be turned on**. This setting can be found under your site settings -> SEO -> Authors.

### Installing

1. Download the zip file of the latest release
2. Open Publii (if necessary, create or open a site)
3. Click the three-dot menu icon at the top-right of Publii, and select "Plugins"
4. Either click the "Install plugin" button at the top-right and find the zip, or simply drag the zip file onto the plugins window

### Using

To enable the Dialogue Blocks plugin for a Publii site, go to "Tools & Plugins" in the menu on the left side of Publli, and click the toggle at the bottom-left of the "Dialogue Blocks" panel. Then you can click in the center of the panel to change Dialogue Blocks settings.

By default, all posts will be rendered in the "guildchat" theme, similar to a Discord text chat. This can be changed for all posts in the plugin settings.

To start writing dialogue, first go to the "Authors" tab in Publii, and create new authors corresponding to the characters in the dialogue. For the "Name" field, enter the name you'll use in the script - for example, if you enter "David", then you can start dialogue from that character with {{David}}. This name may also be displayed in excerpts (like the post index) and when you set the VN Names setting to "Basic". In the "Description" field, write how you want their name to be displayed in dialogue - this can be the same name, a longer name, or a chatroom-style display name. Then, under the "Avatar and Featured image" tab of the author page, you can attach an avatar for their dialogue, and a portrait (as a featured image) for themes with larger portraits by the dialogue.

Once you have your characters set up, you can make a new post with the dialogue scripted out. To start a new dialogue block for a character, make a new line with {{character name}} on it. Lines underneath that will be part of that character's dialogue block. You can also close the dialogue block and start writing non-dialogue text with an empty tag, {{}}.

To override the default theme for a post or switch themes mid-post, you can write a line in the form of {{theme: themename}}, such as {{theme: visualnovel}}. To close a section of dialogue and write unformatted text, write a line in this format with no theme name, that is, {{theme: }}.

To see your script formatted, save and close the post, then select "Preview your changes" at the bottom of Publii's main menu.

While not necessary to use Dialogue Blocks, if you are familiar with CSS you can add custom CSS to your site to customize the dialogue blocks or themes, by going to Tools & Plugins and selecting "Custom CSS".

## Known issues

There are some known issues due to not having finished ironing out bugs, or due to limitations or problems in Publii itself, which this plugin's author has no control over.

* Previewing individual posts will not show the formatting. It's unknown why this is or if it's solvable by the plugin, but for the moment the plugin is not called when previewing a single post, you will need to preview the entire site to see a post formatted correctly.

* Author Page will list all characters as well as the main author. You may want to disable "authors pagination" for your site for this reason.

* Images cannot be embedded inline in dialogue (this is an issue with Publii, when images are embedded inline in a paragraph, it will end the paragraph before the image - this is noted here because otherwise formatting in the WYSIWYG editor should be preserved when in the final render)

## Authors

Dana Callista Lexa

## Acknowledgments

Icon by Rudy Muhardika: https://www.svgrepo.com/svg/429742/chat-profile-profiles