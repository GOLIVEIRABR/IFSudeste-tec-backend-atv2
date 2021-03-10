const http = require ('http');
//const url = require('url'); //resolve e faz parse de urls
const fs = require ('fs'); //interação com sistema de arquivos
const path = require('path'); //resolve caminhos de arquivos

const hostname = '127.0.0.1';
const port = 3000;

//media type, multipurpose internet mail extension é um padrão que indica a natureza e o formado de um arquivo

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "img/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof"
};

http.createServer((req, res) => {
  //let acesso_uri = url.parse(req.url).pathname;
  let acesso_uri = req.url;
  
  let caminho_completo_recurso = path.join(process.cwd()+'/site', decodeURI(acesso_uri));
  //console.log(acesso_uri);

  let recurso_carregado;

  try {
    recurso_carregado = fs.lstatSync(caminho_completo_recurso);
    if (recurso_carregado.isFile()){
      let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)];
      res.writeHead(200, {'Content-Type': mimeType});
      let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
      fluxo_arquivo.pipe(res);
    }else if(recurso_carregado.isDirectory()){
      //res.writeHead(302, {'Location:': 'index.html'});
      res.writeHead(302, {Location: 'index.html'});
      res.end();
    }else{
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.write("500: Internal Server Error; chartset=utf8");
      res.end();
    }  
  } catch (error) {
      res.writeHead(404, {'Content-Type' : 'text/plain; charset=utf-8'});
      res.write("Endereço não encontrado!");
      res.end();
  
  } 
}).listen(port, hostname, ()=> {
  console.log(`Server is running at https://${hostname}:${port}/`);
});


