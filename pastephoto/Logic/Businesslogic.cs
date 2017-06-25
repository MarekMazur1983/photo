using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pastephoto.Logic.Message;
using Newtonsoft.Json;

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
    }
}