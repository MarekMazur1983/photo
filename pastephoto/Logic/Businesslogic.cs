using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pastephoto.Logic.Message;
using Newtonsoft.Json;
using System.IO;
using System.Drawing;

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
        public void SaveFileOnDrive(HttpPostedFileBase file,string mapPath,string guid,string fName) 
        {
          
            if (file != null && file.ContentLength > 0)
            {

                var originalDirectory = new DirectoryInfo(string.Format("{0}Images", mapPath));

                string pathString = System.IO.Path.Combine(originalDirectory.ToString(), guid);

                var fileName1 = Path.GetFileName(fName);

                bool isExists = System.IO.Directory.Exists(pathString);

                if (!isExists)
                    System.IO.Directory.CreateDirectory(pathString);

                var path = string.Format("{0}\\{1}", pathString, fName);
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
            Models.Pastephoto p = new Models.Pastephoto(this.db);
            var pp = p.Fetch(guid);
            Settings settingsObj = JsonConvert.DeserializeObject<Settings>(pp.settings);
            return settingsObj.gallery;
        }
        public Response SaveSettings(string settings,string mapPath)
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

                if(settingsObj.isWatermark == true)
                {
                    addWatermark(settingsObj.guid, mapPath);
                }
            }
            catch (Exception ex)
            {
                res.status = Status.ERROR;
                res.error = ex.Message;
            }
            return res;

        }
        public Settings GetSettings(string guid)
        {
            Models.Pastephoto p = new Models.Pastephoto(this.db);
            var pp = p.Fetch(guid);
            if (pp == null)
                return null;
            Settings settingsObj = JsonConvert.DeserializeObject<Settings>(pp.settings);
            return settingsObj;
        }
        public List<image> GetImages(string guid)
        {
            var img = new Models.Image(this.db);
            return img.Fetch(guid);

        }
        public bool CheckPassword(Logic.Message.Password data)
        {
            var settings = this.GetSettings(data.guid);
            if (settings != null && settings.password == data.password)
                return true;
            return false;
        }
        public void Update(image i)
        {
            Models.Image im = new Models.Image(this.db);
            im.Update(i);
        }
        private void addWatermark(string guid,string mapPath)
        {
            var images =this.GetImages(guid);
           
            foreach (var img in images)
            {
                var tempFilename = Guid.NewGuid().ToString().Split('-').First();
                var originalDirectory = new DirectoryInfo(string.Format("{0}Images", mapPath));
                string pathString = System.IO.Path.Combine(originalDirectory.ToString(), guid);
                string pathWatermark = System.IO.Path.Combine(originalDirectory.ToString(), "Content\\copyright.png");
                var path = string.Format("{0}\\{1}", pathString, img.filename);
                var tempPath = string.Format("{0}\\{1}", pathString, tempFilename);
                System.IO.File.Move(path, tempPath);
                using (Image i = Image.FromFile(tempPath))

                using (Image watermarkImage = Image.FromFile(pathWatermark))
              
                using (TextureBrush watermarkBrush = new TextureBrush(watermarkImage))
                {

                    var b = new Bitmap(i);
                    
                    var imageGraphics = Graphics.FromImage(b);
                    //imageGraphics.DrawImage(i,new Point (0, 0 ));
                    int x = i.Width;
                    int y = i.Height;
                  //  watermarkBrush.TranslateTransform(x, y);
                    imageGraphics.FillRectangle(watermarkBrush, new Rectangle(new Point(0, 0), new Size(i.Width + 1, i.Height)));
                    
                  
                    b.Save(path);
                   // i.Dispose();
                   
                }
                File.Delete(tempPath);
            }

           
            
        }
        //public string 
    }
}