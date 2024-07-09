## 백트래킹(BackTracking)이란?

- 해를 찾는 도중 해가 절대 될 수 없다고 판단되면, 되돌아가서 해를 다시 찾아가는 기법을 말한다.
- 모든 경우의 수를 고려하여 해를 찾는 방식
    - 해를 찾기 위해 후보군 나열
    - 제약 조건을 점진적으로 체크
    - 만약 조건에 맞지 않다면 뒤로 돌아와서, 바로 다음 후보군으로 넘어감
- 주로 재귀 함수를 통해 구현된다.

## 구현 코드 예제

```java
import java.util.*;

public class DepthFirstSearchBacktracking {
    private Map<Integer, List<Integer>> graph;
    private Set<Integer> visited;
    private List<Integer> path;

    public DepthFirstSearchBacktracking() {
        graph = new HashMap<>();
        visited = new HashSet<>();
        path = new ArrayList<>();
    }

    public void addEdge(int source, int destination) {
        graph.computeIfAbsent(source, k -> new ArrayList<>()).add(destination);
        graph.computeIfAbsent(destination, k -> new ArrayList<>()).add(source); // 무방향 그래프인 경우
    }

    public boolean dfs(int current, int target) {
        // 현재 노드를 방문한 것으로 표시하고 경로에 추가
        visited.add(current);
        path.add(current);

        // 목표 노드에 도달한 경우
        if (current == target) {
            return true;
        }

        // 인접한 노드를 탐색
        for (int neighbor : graph.getOrDefault(current, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                if (dfs(neighbor, target)) {
                    return true; // 목표 노드를 찾은 경우
                }
            }
        }

        // 백트래킹: 현재 노드를 방문하지 않은 것으로 표시하고 경로에서 제거
        visited.remove(current);
        path.remove(path.size() - 1);
        return false;
    }

    public List<Integer> getPath() {
        return path;
    }

    public static void main(String[] args) {
        DepthFirstSearchBacktracking dfsBacktracking = new DepthFirstSearchBacktracking();
        // 그래프의 간선 추가 (예시)
        dfsBacktracking.addEdge(1, 2);
        dfsBacktracking.addEdge(1, 3);
        dfsBacktracking.addEdge(2, 4);
        dfsBacktracking.addEdge(2, 5);
        dfsBacktracking.addEdge(3, 6);
        dfsBacktracking.addEdge(3, 7);

        int startNode = 1;
        int targetNode = 6;

        if (dfsBacktracking.dfs(startNode, targetNode)) {
            System.out.println("Path found: " + dfsBacktracking.getPath());
        } else {
            System.out.println("No path found.");
        }
    }
}
```
