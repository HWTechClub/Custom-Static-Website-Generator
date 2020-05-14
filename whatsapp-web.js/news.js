let Parser = require('rss-parser');
let parser = new Parser();
 
(async () => {
 
  //let feed = await parser.parseURL('https://www.reddit.com/.rss');
  let feed = await parser.parseURL('https://gulfnews.com/rss/?generatorName=mrss&uuid=5bd9758c-9198-40ac-8d81-1e38745d5485');
  console.log(feed.title);
 
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
 
})();