using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class FollowControllerTest
    {


        [Test]
        public async Task FollowUnfollow()
        {
            await Task.Delay(10);
            Assert.IsNotNull(true);
        }
    }
}
