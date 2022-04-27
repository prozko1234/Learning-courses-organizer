using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityLike
    {
        public Guid Id { get; set; }
        public Activity Activity { get; set; }
        public User User { get; set; }
    }
}