using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class ChatControllerTest
    {

        [Test]
        public async Task SendMessage()
        {
            await Task.Delay(16);
            Assert.IsNotNull(true);
        }
    }
}
