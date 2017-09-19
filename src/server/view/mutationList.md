# mutation操作

## createUser

```javascript
var query = `mutation ($authObj:authInputType){
  createUser(authObj:$authObj) {
    infoId,
    infoName,
    infoNickname
  }
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    authObj: {
      authType: 'phone',
      authAccount: '15167120027',
      authCredential: '123456',
    }
  }
}));
```

## userLogin

```javascript
var query = `mutation ($authObj:authInputType){
  userLogin(authObj:$authObj) {
    infoId,
    infoName,
    infoNickname
  }
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    authObj: {
      authType: 'phone',
      authAccount: '15167120027',
      authCredential: '123456',
    }
  }
}));
```

## addUserAuth

```javascript
var query = `mutation ($authObj:authInputType){
  addUserAuth(authObj:$authObj) {
    authList
  }
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    authObj: {
      authType: 'email',
      authAccount: 'drytreecrow@gmail.com',
      authCredential: '654321',
    }
  }
}));
```

## removeUserAuth

```javascript
var query = `mutation ($authType:String){
  removeUserAuth(authType:$authType) {
    authList
  }
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    authType: 'qq'
  }
}));
```

## updateInfo

```javascript
var query = `mutation ($infoObj:infoUpdateType){
  updateInfo(infoObj:$infoObj) {
    infoId,
    infoName,
    infoNickname,
    infoAvatar,
    infoSex,
    infoBirthday,
    infoPhone,
    infoEmail,
    infoAddress
  }
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    infoObj: {
      infoName: '王志辉',
      infoNickname: 'jonirlulu',
      infoAvatar: '1',
      infoSex: '男',
      infoBirthday: new Date().setFullYear(1991, 10, 19),
      infoPhone: '13117001971',
      infoEmail: '945641139@qq.com',
      infoAddress: '石家庄',
    }
  }
}));
```

## updatePassword

```javascript
var query = `mutation ($password:String){
  updatePassword(password:$password)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    password: '768789'
  }
}));
```

## deleteUser

```javascript
sak
```

## addFollow

```javascript
var query = `mutation ($infoId:ID){
  addFollow(infoId:$infoId)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    infoId: 1
  }
}));
```

## removeFollow

```javascript
var query = `mutation ($infoId:ID){
  removeFollow(infoId:$infoId)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    infoId: 5
  }
}));
```

## createOpus

```javascript
var query = `mutation ($opusObj:opusCreateType){
  createOpus(opusObj:$opusObj)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    opusObj: {
      opusTitle: '作品标题',
      opusSummary: '作品概述',
      opusText: '作品正文',
    }
  }
}));
```

## updateOpus

```javascript
var query = `mutation ($opusObj:opusUpdateType){
  updateOpus(opusObj:$opusObj)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    opusObj: {
      opusId: 26,
      opusText: 'sajdasipdjaspjmp弄啊傻逼从安',
    }
  }
}));
```

## deleteOpus

```javascript
var query = `mutation ($opusId:ID){
  deleteOpus(opusId:$opusId)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    opusId: 26
  }
}));
```

## createJudge

```javascript
var query = `mutation ($judgeObj:judgeCreateType){
  createJudge(judgeObj:$judgeObj)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    judgeObj: {
      judgeOpusId: 27,
      judgePrefer: -1,
      judgeContent: '表示不赞同你的看法'
    }
  }
}));
```

## createComment

```javascript
var query = `mutation ($commentObj:commentCreateType){
  createComment(commentObj:$commentObj)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {
    commentObj: {
      commentOpusId: 2,
      commentCommentId:8,
      commentContent: '给点建设性的评论不行吗？',
    }
  }
}));
```
