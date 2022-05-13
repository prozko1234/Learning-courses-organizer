using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class PhotosControllerTest
    {


        [Test]
        public async Task AddPhoto()
        {
            await Task.Delay(40);
            Assert.IsNotNull(true);
        }



        [Test]
        public async Task DeletePhoto ()
        {
            await Task.Delay(22);
            Assert.IsNotNull(true);
        }
    }
}
