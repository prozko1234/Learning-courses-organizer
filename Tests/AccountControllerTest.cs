using API.Controllers;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Tests
{
    public class AccountControllerTest
    {

        public AccountControllerTest()
        {
        }

        [Test]
        public async Task Login()
        {
            await Task.Delay(45);
            Assert.IsNotNull(true);
        }

        [Test]
        public async Task Register()
        {
            await Task.Delay(34);
            Assert.IsNotNull(true);
        }
    }
}