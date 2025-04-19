using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Electronic.Models;

namespace Electronic.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(AuthModel authModel)
        {
            if (authModel.UserName == "Admin" && authModel.Password == "Admin")
            {
                var claims = new List<Claim>
                {
                new Claim(ClaimTypes.Name, authModel.UserName),
                new Claim(ClaimTypes.Role,"Admin")
                };


                ClaimsIdentity identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProparties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProparties);
                return RedirectToAction("Index", "Admin");
            }
            ViewBag.error = "Invalid credentials";
            return View();
        }


        public async Task<IActionResult> Logout()
        {

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");

        }

        public IActionResult Forgot()
        {
            return View();
        }
    }
}
