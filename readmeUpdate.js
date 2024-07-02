import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hi there 👋

[![Yejin's GitHub stats](https://github-readme-stats.vercel.app/api?username=yezanee)](https://github.com/anuraghazra/github-readme-stats)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=yezanee&layout=compact&hide=r,jupyter%20notebook,c%23&exclude_repo=roharui.github.io)](https://github.com/anuraghazra/github-readme-stats)

## 이런 환경에 익숙해요✍🏼

## 언어

<p>
  <img alt="" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img alt="" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=blue"/>
</p>

## Contact me

yezanee@gmail.com

## 📕 Latest Blog Posts
<p>
    <a href="https://yezaneeworld.tistory.com/"><img src="https://img.shields.io/badge/Blog-FF5722?style=flat-square&logo=Blogger&logoColor=white"/></a><br>
</p>

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {
    try {
        // 피드 목록
        const feed = await parser.parseURL('https://yezaneeworld.tistory.com/rss');

        // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
        for (let i = 0; i < 5; i++) {
            if (i >= feed.items.length) {
                console.log(`${i + 1}번째 게시물이 존재하지 않습니다.`);
                continue;
            }
            
            const item = feed.items[i];
            if (!item) {
                console.log(`${i + 1}번째 게시물이 존재하지 않습니다.`);
                continue;
            }
            const { title, link } = item;
            if (!title || !link) {
                console.log(`${i + 1}번째 게시물에 제목이나 링크가 없습니다.`);
                continue;
            }
            console.log(`${i + 1}번째 게시물`);
            console.log(`추가될 제목: ${title}`);
            console.log(`추가될 링크: ${link}`);
            text += `<a href=${link}>${title}</a></br>`;
        }

        // README.md 파일 작성
        writeFileSync('README.md', text, 'utf8', (e) => {
            if (e) console.log(e);
        });

        console.log('업데이트 완료');
    } catch (error) {
        console.error('Error fetching or processing feed:', error);
    }
})();
