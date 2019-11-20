import mysql.connector
import json
import requests
#random
import random
random.seed(5)

conn =  mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="adiera",
  database="perpus_online"
)

def checkKey(dict, key):
#mengembalikan true jika key ada di dictionary dan false jika tidak
    if key in dict: 
        return True
    else: 
        return False
        
        
def isiDbase():
    cursor = conn.cursor()
    for i in range (137000, 137050):
    #melakukan pencarian sesuai range yang ditetapkan
        try :
            url = 'https://webpac.lib.itb.ac.id/index.php/marc/view/{}/JSON'.format(i)

            #memasukkan data JSON ke variabel data
            data = requests.get(url)
            data = json.loads(data.text)

            #mencari Judul (Jika tidak ada diberi nilai null)
            for j in range (0, len(data[0]['fields'])):
                if checkKey(data[0]['fields'][j],'245') :
                    Judul = data[0]['fields'][j]['245']['subfields'][0]['a']
                    break
                else :
                    Judul = "null"
                    
            #mencari ISBN (Jika tidak ada diberi nilai null)
            ISBN = random.randrange(0000000000000, 9999999999999)

            #mencari Penulis (Jika tidak ada diberi nilai null)
            for j in range (0, len(data[0]['fields'])):
                if checkKey(data[0]['fields'][j],'100') :
                    Penulis = data[0]['fields'][j]['100']['subfields'][0]['a']
                    break
                else :
                    Penulis = "null"

            #mencari Penerbit dan Tahun Terbit (Jika tidak ada diberi nilai null)
            for j in range (0, len(data[0]['fields'])):
                if checkKey(data[0]['fields'][j],'260') :
                    Penerbit = data[0]['fields'][j]['260']['subfields'][1]['b']
                    Tahun_terbit = data[0]['fields'][j]['260']['subfields'][2]['c']
                    break
                else :
                    Penerbit = "null"
                    Tahun_terbit = "null"

            #insert into database
            instance = (ISBN, Judul, Penulis, Penerbit, Tahun_terbit)
            query = """INSERT INTO buku(
                ISBN,
                Judul_Buku,
                Pengarang,
                Penerbit,
                Tahun_Terbit
                )
                Values (%s,%s,%s,%s,%s)"""
            cursor.execute(query, instance)
            conn.commit()
        #menghandle exception
        except Exception as e:
            print(e)
            continue
    
    cursor.close()
    
def main():
	isiDbase()
	

main()
