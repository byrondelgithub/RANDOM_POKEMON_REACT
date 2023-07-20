const { createProxyMiddleware } = require("http-proxy-middleware");
const constants = require("./data/constants");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/pkParaiso", {
      target: `${constants.pkParaisoAPIUrl}`,
      changeOrigin: true,
      pathRewrite: {
        "^/pkParaiso": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
  app.use(
    createProxyMiddleware("/projectPokemon", {
      target: `${constants.projectPokemonAPIUrl}`,
      changeOrigin: true,
      pathRewrite: {
        "^/projectPokemon": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
  app.use(
    createProxyMiddleware("/pokeapi", {
      target: `${constants.pokeAPIUrl}`,
      changeOrigin: true,
      pathRewrite: {
        "^/pokeapi": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
