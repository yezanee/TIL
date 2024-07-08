organization에 새로운 브랜치가 여러개 만들어졌는데 이걸 내가 fork한 브랜치에 반영하는 방법을 모르겠어서

그냥 fork 했었던 레퍼지토리를 삭제하고 다시 포크를 했다 ..

이를 포크한 레퍼지토리를 삭제하고 다시 포크하지 않아도 내가 포크했던 레퍼지토리에 반영할 수 있는 방법은 나중에 알아보도록 하고

우선 내가 로컬에서 브랜치를 새로 생성하고, 이를 원격 레퍼지토리에 반영하는 방법을 기록해놓도록 하겠다.

```
cd [fork-repo-name]
git remote update // 모든 원격 브랜치를 업데이트하여 최신 상태로 갱신한다. 하지만 로컬 저장소에서 변동사항을 병합(merge)하지 않는다.
git checkout develop // 새로운 브랜치에 해당 브랜치의 내용 복사 원함
git checkout -b feature-login // 해당 브랜치에 feature-login라는 이름의 새로운 브랜치 생성
git push upstream feature-login // 원격 저장소에 반영
```

\* 이때, upstream의 주소를 확인 (내가 fork한 레포의 주소인지 원본 레퍼지토리의 주소인지)

```
git remote -v // remote 주소 확인
git remote set-url [주소 변경 원하는 remote name] [변경할 주소]
// 원본 레퍼지토리로 연결되어 있다면, 내가 포크한 레퍼지토리로 주소 변경
