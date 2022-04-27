using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Messages
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
        public Profile Author { get; set; }
        public Chat Chat { get; set; }
    }
}