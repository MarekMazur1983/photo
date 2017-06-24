using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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


    }
}