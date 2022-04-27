using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Chats
{
    public class ChatDto
    {
        public Guid Id { get; set; }
        public Profile User { get; set; }
        public Profile SecondUser { get; set; }
        public string? LastMessage { get; set; }
        public DateTime LastMessageDate { get; set; }
    }
}