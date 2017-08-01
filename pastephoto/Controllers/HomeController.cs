using Newtonsoft.Json;
using pastephoto.Logic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pastephoto.Controllers
{
    //https://stackoverflow.com/questions/12870137/automatically-add-watermark-to-an-image
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            Businesslogic bl = new Businesslogic();
            if (id == null)
            {
                ViewBag.guid = bl.GetGuid();
                var x = bl.GetGalleryType();
                ViewBag.gallery =bl.GetGalleryType();
                return View();
            }
            else
            {
                var guid = id;
                var password = Request["password"];
                Logic.Message.Settings settings;
                string viewName = "";

                if (password !=null)
                {
                    
                    settings = bl.GetSettings(guid);
                    if(settings == null)
                    {
                        return Content("<h1>page does not exist</h1>");
                    }
                        
                    ViewBag.guid = guid;
                    if (settings.password == password)
                    {
                        viewName = bl.GetGalleryViewName(guid);
                      
                        ViewBag.images = bl.GetImages(guid);

                        ViewBag.settings = settings;
                        return View("../Home/Gallery/" + viewName);
                    }
                    else
                    {
                        return View("Login");
                    }
                }

                else
                {
                    ViewBag.guid = guid;
                    settings = bl.GetSettings(id);
                    if (settings == null)
                    {
                        return Content("<h1>page does not exist</h1>");
                    }
                    if (settings.isPassword == true)
                    {
                        return View("Login");
                    }
                    else
                    {
                        viewName = bl.GetGalleryViewName(guid);
                        
                        ViewBag.images = bl.GetImages(guid);

                        ViewBag.settings = settings;
                        return View("../Home/Gallery/" + viewName);
                    }
                }
            } 
        }

        public ActionResult Uploadfile(string id)
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            var bl = new Businesslogic();
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    string mapPath = Server.MapPath(@"\");
                    var fname = Guid.NewGuid().ToString().Split('-').First() + file.FileName;
                    bl.SaveFileOnDrive(file, mapPath,id,fname);
                    bl.SaveFileInDb(fname, id);

                }
            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }


            if (isSavedSuccessfully)
            {
                return Json(new { Message = fName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }
        }
        public ActionResult Save()
        {
            var settings = Request["json"];
            Businesslogic bl = new Businesslogic();
            var res =bl.SaveSettings(settings, Server.MapPath(@"\"));
            return Content(Newtonsoft.Json.JsonConvert.SerializeObject(res));
          
        }
        public ActionResult Login()
        {
            var passjson = Request["json"];
            Logic.Message.Password data = JsonConvert.DeserializeObject<Logic.Message.Password>(passjson);
            Businesslogic bl = new Businesslogic();
            var res = new Logic.Message.Response();
            if (bl.CheckPassword(data))
            {
                res.status = Logic.Message.Status.OK;
               
            }
            else
            {
                res.status = Logic.Message.Status.ERROR;
            }
            return Content(Newtonsoft.Json.JsonConvert.SerializeObject(res));

        }
        public ActionResult Update()
        {
            var imagejson = Request["json"];
            image data = JsonConvert.DeserializeObject<image>(imagejson);
            Businesslogic bl = new Businesslogic();
            bl.Update(data);
            return null;
        }
    }
}