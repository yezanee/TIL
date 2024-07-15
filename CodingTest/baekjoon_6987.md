# 💡 **문제 분석 요약**

월드컵에서 6개의 팀이 각각 5경기를 치른 결과가 주어졌을 때, 해당 결과가 가능한지 여부를 확인하는 문제

# 💡 **알고리즘 설계**

- 각 팀은 승, 무, 패 결과를 가짐
- 주어진 결과를 기반으로 가능한 경기 결과를 DFS를 사용해 시뮬레이션
- 경기 쌍을 순회하면서 각 경기에서 승, 무, 패의 경우를 재귀적으로 탐색하여 가능한지 확인
- DFS 탐색의 깊이는 15이며, 각 깊이마다 세 가지 경우를 고려
- 최종적으로 각 테스트 케이스에 대해 가능한 경우 1, 불가능한 경우 0을 출력

# **💡 코드**

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.StringTokenizer;

public class Main {
	static int win[],lose[],draw[]; // 승, 패, 무 결과 저장
	static int t1[],t2[]; // 각 경기에서 경기하는 두 팀의 번호 저장
	static boolean avail; // 현재 결과 가능한지 여부
	
	static void dfs(int idx) {
		
		if(avail) return; // 가능한 결과를 찾으면 더 이상 탐색 x
		
		if(idx==15) { // 모든 경기를 탐색했을 때
			avail=true;
			return;
		}
		
		int a = t1[idx]; // 경기하는 팀 1
		int b= t2[idx]; // 경기하는 팀 2
		
		//a가 이기는 경우
		if(win[a]>0 && lose[b]>0) {
			win[a]--;
			lose[b]--;
			dfs(idx+1);
			win[a]++;
			lose[b]++;
		}
		
		//a와 b가 비기는 경우
		if(draw[a]>0 && draw[b]>0) {
			draw[a]--;
			draw[b]--;
			dfs(idx+1);
			draw[a]++;
			draw[b]++;
		}
		
		//a가 지는 경우
		if(lose[a]>0 && win[b]>0) {
			lose[a]--;
			win[b]--;
			dfs(idx+1);
			lose[a]++;
			win[b]++;
		}
	}
	
	public static void main(String[] args) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int cnt = 0;
		t1 = new int[15]; // 경기하는 팀 1
		t2 = new int[15]; // 경기하는 팀 2
		
        // t1, t2 배열 초기화 (15개의 경기 쌍 생성)
		for(int i=0;i<5;i++) {
			for(int j=i+1;j<6;j++) {
				t1[cnt]=i;
				t2[cnt++]=j;
			}
		}
		
		for(int i=0;i<4;i++) {
			String s = br.readLine();
			StringTokenizer st = new StringTokenizer(s);
			win = new int[6];		
			lose = new int[6];		
			draw = new int[6];	
			avail=false;			
			int w=0,l=0,d=0;
			
			// 각 팀의 승, 무, 패 기록을 읽음
			for(int j=0;j<6;j++) {
				w += win[j] = Integer.parseInt(st.nextToken());
				d += draw[j] = Integer.parseInt(st.nextToken());
				l += lose[j] = Integer.parseInt(st.nextToken());
			}
			
			// 승, 무, 패 합이 30이 아닌 경우 불가능한 결과로 처리
			if(w+d+l!=30)
				avail=false;
			else
				dfs(0); // 가능한지 여부를 확인하기 위해 DFS 호출

            // 결과 출력
			if(avail) System.out.print(1+" ");
			else System.out.print(0+" ");
		}
	}
}
```

출처 : https://imnotabear.tistory.com/157

# **💡시간복잡도**

O(3^15)

# **💡 막힌 이유**

- 불가능한 경우가 어떤 경우들이 있는지 공통적인 특징을 찾아내지 못했음
- 그냥 구현이 막막 ..

# **💡 느낀점 or 기억할정보**

- 푸는 방식이 다양한 문제인 것 같다
- 급하게 푸느라 정확하게 이해하지 못한 채로 문제를 접근한 것 같다. 이 문제는 나중에 꼭 다시 복습해보기
