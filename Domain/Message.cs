
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public User Author { get; set; }
        public Chat Chat { get; set; }
    }
}