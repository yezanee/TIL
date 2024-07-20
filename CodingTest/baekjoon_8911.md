# 💡 **문제 분석 요약**

- 2차원 평면 위에서 움직이는 거북이 로봇에게 내릴 수 있는 명령
    1. F: 한 눈금 앞으로
    2. B: 한 눈금 뒤로
    3. L: 왼쪽으로 90도 회전 (방향만 바꿈)
    4. R: 오른쪽으로 90도 회전 (방향만 바꿈)
- x축과 y축에 평행한 방향으로만 이동
- 거북이가 지나간 영역을 모두 포함할 수 있는 가장 작은 직사각형 넓이 구하기 (x, y축에 평행)
- 거북이가 지나간 영역이 직사각형을 만들지 않는 경우 = 선분의 경우 = 넓이 0으로 간주

# 💡 **알고리즘 설계**

- 방향 및 위치
    - 방향 배열 (dx, dy)를 이용하여 거북이 로봇의 x축과 y축 이동 변화 나타내기
    - 방향 변수 초기화 (0 = 북쪽)
    - 현재 위치 (0, 0) 초기화
- 방향 배열 이용하여 이동 경로 계산
    - 이동 후 현재 위치 업데이트
    - 최소 및 최대 x, y 좌표 갱신
- 최소 직사각형 면적 계산
    - minX, minY, maxX, maxY 이용

# 💡코드

```java
import java.io.*;

public class Main
{
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		
		int T = Integer.parseInt(br.readLine());
		
		int[] dx = {-1, 0, 1, 0};
		int[] dy = {0, 1, 0, -1};
	
		for(int i = 0; i < T; i++) {
		    int minX = 0, minY = 0, maxX = 0, maxY = 0; // 로봇의 이동범위 계산 위하여
		    int dir = 0; // direction, 즉 방향 변수. 0은 북쪽, 1은 동쪽, 2는 남쪽, 3은 서쪽을 의미
		    int nowX = 0, nowY = 0; // 현재 위치 (초기위치 (0,0))
		    
		    String command = br.readLine();
		    
		    for (int j = 0; j < command.length(); j++) {
		        char c = command.charAt(j); // 명령 하나 저장
		        
		        if (c == 'F') { // 한 눈금 앞으로
		            nowX = nowX + dx[dir];
		            nowY = nowY + dy[dir];
		        } else if (c == 'B') { // 한 눈금 뒤로
		            nowX = nowX - dx[dir];
		            nowY = nowY - dy[dir];
		        } else if (c == 'L') { // 왼쪽으로 90도
		            if (dir == 0) dir = 3; // 범위 '0 ~ 3' 안에 들어오도록
		            else dir--; // 현재 방향에서 반시계 방향
		        } else if (c == 'R') { // 오른쪽으로 90도
		            if (dir == 3) dir = 0; // 범위 '0 ~ 3' 안에 들어오도록
		            else dir++; // 현재 방향에서 시계 방향
		        }
		        
		        /* 로봇이 이동하는 전체 범위 추적 */
		        minX = Math.min(minX, nowX);
            minY = Math.min(minY, nowY);
            maxX = Math.max(maxX, nowX);
            maxY = Math.max(maxY, nowY);
		    }
		    sb.append( (Math.abs(minX)+Math.abs(maxX)) * (Math.abs(minY)+Math.abs(maxY)) + "\n");
				// 너비 계산
		}
		System.out.println(sb.toString());
	}
}
```

참고 : https://javaju.tistory.com/118

# 💡시간복잡도

O(T*L)

- T : 테스트 케이스 수
- L : `command` 의 길이

# 💡 느낀점 or 기억할정보

- 거북이가 이동하는 경로 파악 핵심
    - 방향 배열!! 잊을만 하면 이걸 이용하는 게 나온다 ..
    - 이동 범위는 그 범위의 최소와 최대 구하기
- 경계 조건 중요
