using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessengerHub : Hub
    {
        private readonly IMediator _mediator;
        public MessengerHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(Create.Command command)
        {
            var message = await _mediator.Send(command);

            await Clients.Group(command.ChatId.ToString())
                .SendAsync("RecieveMessage", message.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var chatId = httpContext.Request.Query["chatId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            var result = await _mediator.Send(new List.Query { ChatId = Guid.Parse(chatId) });
            await Clients.Caller.SendAsync("LoadMessages", result.Value);
        }
    }
}