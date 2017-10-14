const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: 'a5960b42-5964-44b3-8578-7dad48d3c273',
    appPassword: 'HfwZBfbC2Sheaj0SRKWY87h'
});


module.exports = {
    connector: connector,
    builder: builder
}