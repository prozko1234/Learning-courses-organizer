using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Chats;
using Microsoft.AspNetCore.Mvc;
using static Application.Chats.Create;

namespace API.Controllers
{
    public class ChatsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetUserChats()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpPost("{username}")]
        public async Task<IActionResult> CreateChat(string username)
        {
            return HandleResult(await Mediator.Send(new Create.Command { SecondUsername = username }));
        }
    }
}