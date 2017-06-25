using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pastephoto.Logic.Message;
using Newtonsoft.Json;
using System.IO;

namespace pastephoto.Logic
{
    public class Businesslogic
    {
        private pastephotoEntities db = new pastephotoEntities();
        private static Object objTo_lock = new Object();

        public string GetGuid()
        {
            string guid;
            int count;
            lock (Businesslogic.objTo_lock) { 
                do
                {
                    guid = Guid.NewGuid().ToString().Split('-').First();
                    count = db.pastephoto.Where(p => p.guid == guid).Count();

                }
                while (count > 0);

                pastephoto pp = new pastephoto();
                pp.guid = guid;
                pp.added = DateTime.Now;
                db.pastephoto.Add(pp);
                db.SaveChanges();
            }
            return guid;
        }
        public List<gallery> GetGalleryType()
        {
            Models.Gallery g = new Models.Gallery(this.db);
            return g.List();
        }
        public Response SaveSettings(string settings)
        {
            Response res = new Response();
            
            Settings settingsObj;
            try
            {
                
                settingsObj = JsonConvert.DeserializeObject<Settings>(settings);
                pastephoto pp = db.pastephoto.Where(p => p.guid == settingsObj.guid).First();
                pp.lifetime = settingsObj.lifetime;
                pp.settings = settings;
                db.SaveChanges();
                res.status = Status.OK;
            }
            catch(Exception ex)
            {
                res.status = Status.ERROR;
                res.error = ex.Message;
            }
            return res;
         
        }
        public void SaveFileOnDrive(HttpPostedFileBase file,string mapPath,string guid) 
        {
            var fName = file.FileName;
            if (file != null && file.ContentLength > 0)
            {

                var originalDirectory = new DirectoryInfo(string.Format("{0}Images", mapPath));

                string pathString = System.IO.Path.Combine(originalDirectory.ToString(), guid);

                var fileName1 = Path.GetFileName(file.FileName);

                bool isExists = System.IO.Directory.Exists(pathString);

                if (!isExists)
                    System.IO.Directory.CreateDirectory(pathString);

                var path = string.Format("{0}\\{1}", pathString, file.FileName);
                file.SaveAs(path);

            }
        }
        public void SaveFileInDb(string fileName,string guid)
        {
            Models.Image img = new Models.Image(this.db);
            img.Save(fileName, guid);
        }
        public string GetGalleryViewName(string guid)
        {
            var pp =this.db.pastephoto.Where(p => p.guid == guid).First();
            Settings settingsObj = JsonConvert.DeserializeObject<Settings>(pp.settings);
            return settingsObj.gallery;
        }
        public List<image> GetImages(string guid)
        {
            var img = new Models.Image(this.db);
            return img.Fetch(guid);

        }
        //public string 
    }
}