docker run -d \
	    --name infotc-postgres \
	    	-p 5432:5432 \
	        -e POSTGRES_PASSWORD=mysecretpassword \
		    -e PGDATA=/var/lib/postgresql/data/pgdata \
		        -v $PWD/data:/var/lib/postgresql/data \
			    postgres
