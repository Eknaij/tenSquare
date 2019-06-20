package com.tensquare.friend.controller;

import com.tensquare.friend.client.UserClient;
import com.tensquare.friend.service.FriendService;
import entity.Result;
import entity.StatusCode;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/friend")
public class FriendController {
    @Autowired
    private FriendService friendService;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserClient userClient;
    /**
     * 添加好友
     * @param friendid 对方用户ID
     * @param type 1：喜欢 0：不喜欢
     * @return
     */
    @RequestMapping(value="/like/{friendid}/{type}",method= RequestMethod.PUT)
    public Result addFriend(@PathVariable String friendid , @PathVariable String type){
        Claims claims=(Claims)request.getAttribute("user_claims");
        if(claims==null){
            return new Result(false, StatusCode.ACCESSERROR,"无权访问",null);
        }
        //如果是喜欢
        if(type.equals("1")){
            if(friendService.addFriend(claims.getId(),friendid)==0){
                return new Result(false, StatusCode.REPERROR,"已经添加此好友",null);
            }
        }else{
            //不喜欢
            friendService.addNoFriend(claims.getId(),friendid);//向不喜欢列表中添加记录
        }
        userClient.incFollowcount(claims.getId(),1);//增加自己的关注数
        userClient.incFanscount(friendid,1);//增加对方的粉丝数
        return new Result(true, StatusCode.OK, "操作成功",null);
    }
    /**
     * 删除好友
     * @param friendid
     * @return
     */
    @RequestMapping(value="/{friendid}",method=RequestMethod.DELETE)
    public Result remove(@PathVariable String friendid){
        Claims claims=(Claims)request.getAttribute("user_claims");
        if(claims==null){
            return new Result(false, StatusCode.ACCESSERROR,"无权访问",null);
        }
        friendService.deleteFriend(claims.getId(), friendid);
        userClient.incFollowcount(claims.getId(),-1);//减少自己的关注数
        userClient.incFanscount(friendid,-1);//减少对方的粉丝数
        return new Result(true, StatusCode.OK, "删除成功",null);
    }

}

