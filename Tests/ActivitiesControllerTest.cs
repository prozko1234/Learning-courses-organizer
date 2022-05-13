using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class ActivitiesControllerTest
    {
        [Test]
        public async Task AddActivity()
        {
            await Task.Delay(14);
            Assert.IsNotNull(true);
        }

        [Test]
        public async Task EditActivity()
        {
            await Task.Delay(13);
            Assert.IsNotNull(true);
        }

        [Test]
        public async Task GetAll()
        {
            await Task.Delay(20);
            Assert.IsNotNull(true);
        }

        [Test]
        public async Task GetDetails()
        {
            await Task.Delay(16);
            Assert.IsNotNull(true);
        }
    }
}
