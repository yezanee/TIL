# 💡 **문제 분석 요약**

3개의 장대와 n개의 원판이 존재.

1번째 장대 → 3번째 장대로 모든 원판을 이동하는 것이 목표

**조건 :** 한 번에 한 개의 원판만 이동 가능, 큰 원판이 작은 원판 위에 놓일 수 없음.

# 💡 **알고리즘 설계**

**[하노이탑의 공식 유도 과정]**

가장 큰 규칙 **“작은 원판 위에 큰 원판은 올 수 없다.”**

1. 가장 큰 원판을 3번째 장대로 옮기기 위해서는 n-1개의 원판이 1에서 2로 가야한다.
    1. 이동 횟수 Hanoi(n-1)
2. 1번째 장대에 있는 가장 큰 원판이 3번째 장대로 이동
    1. 이동 횟수 1회
3. 2번째 장대에 있는 (n-1)개의 원판을 3으로 이동
    1. 이동 횟수 Hanoi(n-1)
4. 점화식을 세우면, **Hanoi(n) = 2 * Hanoi(n-1) + 1**
    1. 이를 우리가 익숙한 수열 형태로 바꾸면 a_n = 2^n + 1

참고 : https://st-lab.tistory.com/96

# 💡 코드

```java
import java.io.*;

public class Main {   
    static int n; // 첫 번째 장대에 쌓인 원판의 개수
    static BufferedWriter bw;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));
        n = Integer.parseInt(br.readLine());
        
        bw.write((int)(Math.pow(2, n) - 1) + "\n"); // 총 이동 횟수 출력
        hanoi(n, 1, 2, 3); // 1번 장대에서 3번 장대로 이동 목표
        
        bw.flush();
        bw.close();
    }
    
    // 하노이 탑 알고리즘
    public static void hanoi(int n, int from, int by, int to) throws IOException {
        if (n == 1) {
            bw.write(from + " " + to + "\n");
            return;
        }
        
        // n-1개의 원판을 from에서 to를 거쳐 by로 이동 (1 -> 2)
        hanoi(n - 1, from, to, by);
        // 가장 큰 원판을 from에서 to로 이동 (1 -> 3)
        bw.write(from + " " + to + "\n");
        // n-1개의 원판을 by에서 to로 이동 (2 -> 3)
        hanoi(n - 1, by, from, to);
    }
}

```

# 💡시간복잡도

O(2^n)

# 💡 막힌 이유

첫 번째 장대에서 세 번째 장대로 원판을 올려 탑을 쌓을 때, 규칙에 맞도록 **이동 횟수가 최소가 되도록 옮기는 이동 순서**를 어떻게 구현해야 되는 지 아예 감이 안 잡혔었다 ..

```java
import java.io.*;

public class Main
{   
    static int n; // 첫 번째 장대에 쌓인 원판의 개수
    static int k; // 옮긴 횟수
    static int a, b; // a 탑에서 b 탑으로 옮김
    static int[][] tower;
    static boolean[][] moving; // 이동 가능?
    
	public static void main(String[] args) throws IOExceoption {
		BufferedReader br = new BufferedReader(InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(OutputStreamWriter(System.out));
		n = Integer.paserInt(br.readLine());
		tower = new int[3][n]; // 3개의 탑, n개의 원판
		moving = new boolean[3][n];
		
		wonpanMoving(a, b);
		
	}
	
	public static void wonpanMoving(int a, int b) {
	    
	}
	
}
```

내가 초반에 구현한 부분

여기서 더 이상 구현할 수 없었다 .. 😰

하지만 내가 구현한 것 보다 훨씬 더 간단하게 구현할 수 있었다

# 💡 느낀점 or 기억할정보

- 문제 조건(입, 출력 조건 등)에 나와있는 모든 변수를 다 선언할 필요는 없다.
    - 출력으로 해결할 수 있는 건 그냥 출력으로 처리
- 하노이 탑 공식 유도는 유명하니 기억하자!
