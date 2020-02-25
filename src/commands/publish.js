const {Command, flags} = require('@oclif/command')
const IdentityWallet = require('identity-wallet')
const Box = require('3box')

class PublishCommand extends Command {
  async getConsent(request) {
    console.log('request', request);
    return true;
  }

  async run() {
    const SPACE_NAME="demo-app-space-name-123asddsa321";
    const THREAD_ADDRESS = "/orbitdb/zdpuAtwYnE2tLJbahCdJbdfHZesrzz1E332kc5q8MPyRQFHks/3box.thread.demo-app-space-name-123asddsa321.apps_list";
    const SEED = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d' // a hex encoded seed

    const idWallet = new IdentityWallet(this.getConsent, { seed: SEED });
    const provider = idWallet.get3idProvider()
    const box = await Box.openBox(null, provider)

    const space = await box.openSpace(SPACE_NAME);
    await box.syncDone
    const thread = await space.joinThreadByAddress(THREAD_ADDRESS)
    const formData = {
      name: "CLI origin app",
      url: "http://cli.app",
      appImage: "CLI image",
      description: " CLI description",
      account: "0xCLI"
    }
    // await thread.post(formData);
    // await thread.deletePost('zdpuB3anvPZRCgee4e23JJsKd3Gi92BqSxBvS8Kajq4GHchAr');
    console.log('thread.getPosts()', await thread.getPosts());

    const {flags} = this.parse(PublishCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/tom/www/_experiments/3box_cli/src/commands/publish.js`)
  }
}

PublishCommand.description = `Describe the command here
...
Extra documentation goes here
`

PublishCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = PublishCommand
