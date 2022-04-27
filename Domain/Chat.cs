using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Chat
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public User SecondUser { get; set; }
        public string LastMessage { get; set; } = "";
        public DateTime LastMessageDate { get; set; } = DateTime.UtcNow;
    }
}