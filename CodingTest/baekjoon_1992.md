# 💡 **문제 분석 요약**

주어진 이진 영상(n x n)을 쿼드트리 방식으로 압축하는 문제

- 압축 과정에서 동일한 값으로 이루어진 부분은 하나의 값으로 표현
- 그렇지 않은 경우 4개의 부분으로 나누어 재귀적으로 처리합니다.

# 💡 **알고리즘 설계**

- 재귀 구현
    - 기저 조건 검사
        - `isSame(x, y, size)`를 호출하여 현재 영역이 모두 동일한 값을 가지는지 확인
        - 동일하다면, 해당 값을 `StringBuilder`에 추가하고 함수 종료
    - 영역 분할
        - 현재 영역이 모두 동일하지 않은 경우, 영역을 4개의 작은 영역으로 나누어 재귀적으로 `compress` 함수를 호출
        - 각 작은 영역의 크기 = `newSize = size / 2`
        - 분할된 4개의 영역은 각각 (1사분면, 2사분면, 3사분면, 4사분면)으로 나뉨.
    - 재귀 호출
        - 각 작은 영역에 대해 `compress` 함수를 호출하여 다시 동일한 압축 과정을 수행
        - 이 과정은 더 이상 나눌 수 없을 때까지 반복!

# **💡 코드**

```java
import java.util.*;
import java.io.*;

public class Main
{
    static int n; // 영상의 크기
    static char[][] QuadTree;
    static StringBuilder sb = new StringBuilder();
    
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		n = Integer.parseInt(br.readLine());
		
		QuadTree = new char[n][n];
		for(int i = 0; i < n; i++) {
		    String line = br.readLine();
		    for(int j = 0; j < n; j++) {
		        QuadTree[i][j] = line.charAt(j);
		    }
		}
		
		compress(0, 0, n); // 압축 시작
		System.out.println(sb.toString());
		
	}
	
	// 압축 (시작위치(x, y)와 크기 매개변수로 ..)
	public static void compress(int x, int y, int size) {
        if(isSame(x, y, size)) { // 주어진 영역이 모두 동일한가?
            sb.append(QuadTree[x][y]); // 동일한 값이면 해당 값 결과에 추가
            return; // 함수 종료
        }
        
        int newSize = size / 2;
        
        sb.append('(');
        compress(x, y, newSize);           // 1사분면
        compress(x, y + newSize, newSize); // 2사분면
        compress(x + newSize, y, newSize); // 3사분면
        compress(x + newSize, y + newSize, newSize); // 4사분면
        sb.append(')');
    }
    
    // 주어진 영역이 모두 동일한 값을 가지는 지 검사
    public static boolean isSame(int x, int y, int size) {
        char value = QuadTree[x][y]; // 비교할 첫번째 값 저장
        
        for(int i = x; i < x + size; i++) { // 주어진 영역의 모든 값 돌기
            for(int j = y; j < y + size; j++) {
                if(QuadTree[i][j] != value) { // 하나라도 다르면 false
                    return false;
                }
            }
        }
        
        return true; // 모두 같으면 true
    }
}
```

# **💡시간복잡도**

1. **`compress` 함수의 호출 횟수:**
    - `compress` 함수는 주어진 영역이 모두 동일한 값을 가지지 않는 경우, 영역을 4개의 하위 영역으로 나누어 각각에 대해 재귀적으로 호출됩니다.
    - 최악의 경우, 가장 작은 단위(1x1)까지 분할됩니다.
    - 따라서, 한 번의 호출에서 네 개의 작은 영역에 대해 재귀 호출을 합니다.
2. **재귀 호출의 깊이:**
    - 매 호출마다 영역의 크기는 절반으로 줄어듭니다. 즉, `size`가 `n`에서 `n/2`, `n/4`, ..., 1로 줄어듭니다.
    - 이 과정은 `log(n)` 단계에서 종료됩니다.
3. **각 호출의 작업량:**
    - 각 호출에서 `isSame` 함수는 주어진 영역 내의 모든 요소를 확인합니다.
    - `isSame` 함수는 영역의 크기가 `size x size`인 경우 `O(size^2)`의 작업을 수행합니다.

### 전체 시간 복잡도:

재귀 호출의 깊이는 `log(n)`이고, 각 호출에서 `O(size^2)`의 작업을 수행하므로, 각 깊이에서 호출되는 함수들의 총 작업량을 계산해 봅시다.

- 최상위 호출에서 작업량: `O(n^2)`
- 다음 깊이에서는 4개의 하위 영역에 대해 각 `O((n/2)^2)`의 작업을 수행합니다. 즉, 총 작업량은 `4 * O((n/2)^2) = O(n^2)`
- 이와 같은 방식으로 각 깊이마다 작업량은 `O(n^2)`가 됩니다.
- 깊이의 수는 `log(n)`입니다.

따라서 전체 시간 복잡도는:
`O(n^2) * O(log ⁡n) = O(n^2 * log ⁡n)`

> 참고 : chat gpt
> 

# **💡 막힌 이유**

- 시작 위치를 매개변수로 주어서 재귀로 그 위치를 갱신하며 주어진 영역이 동일한 지 찾는 생각을 못했다.

# **💡 느낀점 or 기억할정보**

- 개인적으로 `1780번 종이의 개수` + `1074번 Z` = `1992번 쿼드트리` 인 것 같다고 느꼈다.
- 재귀 구현하는 문제는 느낌이 비슷 비슷 한 것 같다 .. 처음에 재귀를 접했을 때 보다는 문제 형태가 익숙했다! (물론 구현은 아직 미숙하다 ^^ ..)
