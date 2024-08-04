# 💡**문제 분석 요약**

- 독일 로또는 `1 ~ 49` 에서 수 6개를 고른다.
- 49가지 수 중 k(k>6)개의 수를 골라 집합 S를 만든 다음 그 수만 가지고 번호를 선택
- 예를 들어, k=8, S={1,2,3,5,8,13,21,34}인 경우 이 집합 S에서 수를 고를 수 있는 경우의 수는 총 28가지이다. ([1,2,3,5,8,13], [1,2,3,5,8,21], [1,2,3,5,8,34], [1,2,3,5,13,21], ..., [3,5,8,13,21,34])
- 집합 S와 k가 주어졌을 때, 수를 고르는 모든 방법을 구하는 프로그램을 작성하시오.

# 💡**알고리즘 설계**

### 1. 입력

- while 문을 이용하여 k가 0이 나오기 전까지 계속 입력받을 수 있도록 설정
- k, num 배열 입력, check 배열 초기화

### 2. DFS와 백트래킹 이용하여 로또 조합 생성

- check 배열을 이용하여 각 조합 안에서의 중복 방지, 순서 유지 (오름차순)
- check 배열을 이용하여 백트래킹 구현
- 재귀를 이용하여 중복 방지 (i + 1, 현재 선택 숫자의 다음 숫자부터 호출)
- 재귀를 dp == 6 일 때까지 호출하여 6개의 숫자의 조합을 구성
- 반복문을 이용하여 현재 이후의 모든 숫자에 대해 조합을 시도할 수 있음.

# 💡코드

```java
import java.util.*;

public class Main
{
    static int k = 0;
    static int[] num;
    static boolean[] check;
    
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		while(true) {
		    k = sc.nextInt(); // 개수
		    
		    if (k == 0) break; // k가 0이면 반복 종료
		    num = new int[k]; // 입력 숫자 담는 배열
		    check = new boolean[k]; // 숫자가 선택되었는지 체크하는 배열 (조합의 중복 방지)
		    
		    for (int i = 0; i < k; i++) num[i] = sc.nextInt(); // k개의 숫자 입력 받음
		    
		    dfs(0, 0);
		    System.out.println();
		}
		
	}
	
	public static void dfs(int dp, int start) {
	    
	    if (dp == 6) { // 6개의 숫자를 선택하는 경우
	        for (int i = 0; i < k; i++) {
	            if (check[i]) System.out.print(num[i] + " ");
	        }
	        
	        System.out.println();
	        return; // 탐색 종료
	    }
	    
	    for (int i = start; i < k; i++) { // 숫자를 선택하면서 깊이 우선 탐색
	        check[i] = true; // 숫자 선택
	        dfs(dp + 1, i + 1); // 재귀 호출, 다음 깊이 선택
	        check[i] = false; // 숫자 선택 해제 (다른 집합에서 사용할 수 있도록)
	    }
	    
	}
}
```

# 💡시간복잡도

O(k ^ 6)

# 💡 틀린 이유

DFS와 백트래킹의 구현 이해도 부족

# 💡 느낀점 or 기억할정보

### 이 문제를 DFS와 백트래킹을 이용하여 구현한 이유

- 주어진 집합에서 **특정 개수의 원소를 선택하는 모든 조합 생성**
- 조합은 순서가 없다. dfs를 사용하면 이를 자연스럽게 생성할 수 있다.
    - 이미 선택된 원소 이후의 원소들만을 선택하면 중복된 조합을 피할 수 있다.
- 백트래킹을 사용하면 모든 가능한 조합을 효율적으로 탐색할 수 있다.
