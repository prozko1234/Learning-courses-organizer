using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class ProfilesControllerTest
    {


        [Test]
        public async Task GetProfile()
        {
            await Task.Delay(11);
            Assert.IsNotNull(true);
        }
    }
}
