import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

let text = `# Hi there 👋

## 이런 환경에 익숙해요✍🏼

## 언어

<p>
  <img alt="" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img alt="" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=blue"/>
</p>

## Contact me

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  try {
    // 피드 목록
    const feed = await parser.parseURL('https://yezaneeworld.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
      if (!feed.items[i]) {
        break; // 더 이상 항목이 없으면 루프를 종료
      }

      const { title, link } = feed.items[i];
      if (title && link) {
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href="${link}">${title}</a></br>`;
      } else {
        console.log(`항목 ${i}에 제목 또는 링크가 없습니다.`);
      }
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8');
    console.log('업데이트 완료');
  } catch (error) {
    console.error('피드를 가져오는 중 오류 발생:', error);
  }
})();

